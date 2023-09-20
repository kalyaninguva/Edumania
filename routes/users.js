const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
var async = require("async");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var otpGenerator = require("otp-generator");
const TwoFactor = new (require("2factor"))(
  "00d281c1-acfe-11eb-80ea-0200cd936042"
);

// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

router.get("/verify", (req, res) => res.render("verify"));

var newUser;
var mobilestring;
var session;
var user_req;
var otp_mail;

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "btpmail286@gmail.com",
      pass: "btp861966",
    },
  })
);

var mailOptions = {
  from: "btpmail286@gmail.com",
  to: "",
  subject: "",
  text: "",
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, mobile, password, password2 } = req.body;
  console.log(req.body);
  console.log(name);
  let errors = [];

  if (!name || !email || !mobile || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      mobile,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          mobile,
          password,
          password2,
        });
      } else {
        newUser = new User({
          name,
          email,
          mobile,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            mobilestring = mobile.toString();
            console.log("In Bcrypt");
            res.redirect("/users/sendotp");
          });
        });
      }
    });
  }
});

router.get("/sendotp", (req, res, next) => {
  console.log("InOTP");
  console.log(mobilestring);
  TwoFactor.sendOTP(mobilestring).then(
    (sessionId) => {
      session = sessionId;
    },
    (error) => {
      console.log(error);
    }
  );
  res.redirect("/users/verify");
});

router.post("/verify", (req, res, next) => {
  const { otp } = req.body;
  let errors = [];
  if (!otp) {
    errors.push({ msg: "Please enter OTP" });
  }
  if (errors.length > 0) {
    res.render("verify", {
      errors,
      otp,
    });
  } else {
    TwoFactor.verifyOTP(session, otp).then(
      (response) => {
        newUser
          .save()
          .then((user) => {
            req.flash("success_msg", "Account Created");
            res.redirect("/users/login");
          })
          .catch((err) => console.log(err));
      },
      (error) => {
        req.flash("error_msg", "Please re-enter the OTP");
        res.redirect("/users/verify");
      }
    );
  }
});

// Login
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return done(err);
    if (!user) {
      req.flash("error_msg", "Mail doesnot exist");
      res.redirect("/users/Login");
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch) {
          req.flash("error_msg", "Wrong Password");
          res.redirect("/users/Login");
        } else {
          user_req = req.body;
          mailOptions["to"] = req.body.email;
          let mail_text = "OTP is ";
          otp_mail = otpGenerator.generate(6, {
            alphabets: false,
            upperCase: false,
            specialChars: false,
          });
          mailOptions["subject"] = "Verification code";
          mailOptions["text"] = mail_text.concat(otp_mail);
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent");
            }
          });
          res.redirect("/users/verifymail");
        }
      });
    }
  });
});

router.get("/verifymail", (req, res) => res.render("verifymail"));

router.post("/verifymail", (req, res, next) => {
  const { otp } = req.body;
  let errors = [];
  if (!otp) {
    errors.push({ msg: "Please enter OTP" });
  }
  if (errors.length > 0) {
    res.render("verifymail", {
      errors,
    });
  } else {
    if (otp === otp_mail) {
      res.redirect("/users/login_after_auth");
    } else {
      // res.redirect("/users/login_after_auth");
      req.flash("error_msg", "Please re-enter the OTP");
      res.redirect("/users/verifymail");
    }
  }
});

router.get("/login_after_auth", (req, res, next) => {
  req.body = user_req;

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);

});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("http://localhost:3000/");
});

router.get("/forgot", function (req, res) {
  res.render("forgot", {
    user: req.user,
  });
});

router.post("/forgot", function (req, res, next) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash(
              "error_msg",
              "No account with that email address exists."
            );
            return res.redirect("/users/forgot");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        mailOptions["to"] = user.email;
        mailOptions["subject"] = "Password Reset";
        mailOptions["text"] =
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://" +
          req.headers.host +
          "/users/reset/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n";

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            req.flash(
              "info_msg",
              "An e-mail has been sent to " +
                user.email +
                " with further instructions."
            );
          }
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/users/forgot");
    }
  );
  res.redirect("/users/forgot");
});

router.get("/reset/:token", function (req, res) {
  const tkn = req.params.token;
  User.findOne(
    {
      resetPasswordToken : req.params.token,
      // resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/users/forgot");
      }
      console.log(user)
      res.render("reset", {
        token: tkn,
      });
    }
  );
});

router.post("/reset/:token", function (req, res) {
  console.log(req.params.token);
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken : req.params.token,
            // resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            console.log(user)
            if (!user) {
              req.flash(
                "error_msg",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("/users/forgot");
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err) {
              req.logIn(user, function (err) {
                done(err, user);
              });
            });
          }
        );
      },
      function (user, done) {
        mailOptions["to"] = user.email;
        mailOptions["subject"] = "Password Reset";
        mailOptions["text"] =
          "Hello,\n\n" +
          "This is a confirmation that the password for your account " +
          user.email +
          " has just been changed.\n";
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            req.flash(
              "success_msg",
              "Success! Your password has been changed."
            );
          }
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      res.redirect("/users/login");
    }
  );
});


module.exports = router;
