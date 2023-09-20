const mongoose = require("mongoose");

// const url = "mongodb://127.0.0.1:27017/schools";

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// };

// mongoose.connect(url, options);
// var db = mongoose.connection;

// //handle mongo error
// db.once("open", (_) => {
//   console.log("Database connected:", url);
// });
// db.on("error", (err) => {
//   console.error("connection error:", err);
// });

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  capacity: { type: Number },
  contact: { type: String },
  location: { type: String },
  city: { type: String },
});

module.exports = mongoose.model("School", schoolSchema);
