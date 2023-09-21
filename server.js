const mongoose = require("mongoose");
const express = require("express");

const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");

// Passport Config
require("./config/passport")(passport);

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
// app.use("/", require("./routes/index.js"));
var indexroute = require("./routes/index.js");
app.use("/", indexroute.router);
app.use("/users", require("./routes/users.js"));

// app.get('/', (req,res)=> {res.send('API Running');});
// const PORT = process.env.PORT || 5000;

app.use("/schools", require("./routes/api/schools"));

app.use("/api/notices", require("./routes/notice/noticeRoutes.js"));