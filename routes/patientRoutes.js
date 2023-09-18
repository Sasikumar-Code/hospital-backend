const express = require("express");
const patient = require("../models/patient");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "yourSecretKey";
const authenticateToken = require("./token")


// ========== patient Details View ==========

router.get("/gets",authenticateToken, async (req, res) => {
  try {
    const Patient = await patient.find();
    return res.json(Patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/check",authenticateToken, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedData = jwt.verify(token, secretKey); 
    const patient = await patient.findOne();
    return res.json(decodedData);
  } catch (error) {
    return res.status(404).json({ error: "User not found" });
  }
});

// ========== patient add ==========

router.post("/add",authenticateToken, async (req, res) => {
    const {
      Name,
      Age,
      Mobile,
      Address,
      Disease,
      Admision,
    } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const decodedData = jwt.verify(token, secretKey); 
    try {
      const newpatient = new patient({
        Name,
        Age,
        Mobile,
        Address,
        Disease,
        Admision,
        userId:decodedData.user._id,
        userName:decodedData.user.name,
      });
      const savedpatient = await newpatient.save();
      
      const response = {
        decodedData,
        message: "patient Added Successfully",
      };
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // ========== patient update ==========
 
router.put("/update/:id",authenticateToken, async (req, res) => {
  const {
      Name,
      Age,
      Mobile,
      Address,
      Disease,
      Admision,
  } = req.body;
  const patientId = req.params.id;
  try {
    const updatepatient = await patient.findByIdAndUpdate(
      patientId,
      {
        Name,
        Age,
        Mobile,
        Address,
        Disease,
        Admision,
      },
      { new: true }
    );
    // res.send("patient Updated Successfully");
    res.send(`patient Updated Successfully & userId: ${updatepatient._id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== patient delete ==========

router.delete("/delete/:id",authenticateToken, async (req, res) => {
  const patientId = req.params.id;
  try {
    const deletepatient = await patient.findByIdAndDelete(patientId);
    res.json(` This user patientId: ${deletepatient._id} Deleted Successfully `);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;