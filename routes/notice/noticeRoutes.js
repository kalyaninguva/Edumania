const express = require("express");

const router = express.Router();

const Notice = require("../../models/Notice");





router.get("/searchnotice", (req, res) => {
  res.render("search", { notices: false, title: "Search a notice" });
});

router.post("/searchnotice", (req, res) => {
  console.log("In req");
  console.log(req.body);
  Notice.find({ "name": req.body.name })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/create", (req, res) => {
  res.render("create", { title: "Create a new notice" });
});

router.get("/", (req, res) => {
  Notice.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      return res.json({result});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const notice = new Notice(req.body);
  notice
    .save()
    .then((result) => {
      res.redirect("/api/notices");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Notice.findById(id)
    .then((result) => {
      res.render("details", { notice: result, title: "Notice Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/:id/edit", (req, res) => {
   const id = req.params.id;
   Notice.findById(id)
     .then((result) => {
       res.render("update", { notice: result, title: "Update Notice Details" });
     })
     .catch((err) => {
       console.log(err);
     });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
  Notice.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect("/api/notices");
    })
    .catch((err) => {
      console.log(err);
    });
});


router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Notice.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/api/notices");
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
