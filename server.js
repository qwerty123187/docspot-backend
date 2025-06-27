
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Doctor = mongoose.model("Doctor", new mongoose.Schema({
  name: String,
  specialty: String,
  location: String,
  approved: Boolean,
}));

app.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find({ approved: true });
  res.send(doctors);
});

app.listen(5000, () => console.log("Server running on port 5000"));
