const express = require("express");
const { exceptions } = require("winston");
const School = require("../../models/SchoolSchema");
const router = express.Router();
const auth = require("../verifyToken");

// @route : /schools
// @method : Post user
router.post("/", async (req, res) => {
  const { name, type, capacity, contact, location, city } = req.body;

  try {
    const new_school = new School({
      name: name,
      type: type,
      capacity: capacity,
      contact: contact,
      location: location,
      city: city,
    });

    const school = await new_school.save();
    res.json(school);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route : /schools/search
//@method : Search school on parameters

router.post("/search", async (req, res) => {
  try {
    const { type, capacity, location, city } = req.body;
    const schools = await School.find();
    const reqSch = schools.filter((sch) => {
      return (
        sch.type === type ||
        sch.capacity === capacity ||
        sch.location === location ||
        sch.city === city
      );
    });
    const data = await res.json(reqSch);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route: /schools
// @method : Get all schools

router.get("/", auth, async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route: /schools/:locality
// @method: Get schools by locality

router.get("/:locality", async (req, res) => {
  try {
    const schoolLoc = await School.find({ location: req.params.locality });
    res.json(schoolLoc);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route: /schools/:city
// @method: Get schools by city

router.get("/:city", async (req, res) => {
  try {
    const schoolLoc = await School.find({ city: req.params.city });
    res.json(schoolLoc);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route : /schools/:id
// @method : Delete by id

router.delete("/:id", auth, async (req, res) => {
  try {
    const schoolDelete = await School.findByIdAndRemove(
      req.params.id.substring(1)
    );
    return res.status(204).send("Successfully deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send({ err });
  }
});

// @route : /schools/:id
// @method : Update by id

router.put("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id.substring(1) };
    const updated = { $set: req.body };
    const updatedItem = await School.updateOne(query, updated);
    res.json(updatedItem);
  } catch (err) {
    console.err(err);
    res.status(500).send("Not able to update");
  }
});

module.exports = router;
