const Patient = require('../models/Patient');
const mongoose = require('mongoose');
const createPatient = async (req, res) => {
  try {
    const { name, age, gender, phone, doctor } = req.body;
    if(!name || !age || !gender || !phone || !doctor){
      return res.status(400).json({ error: "Please provide all the fields" });
    }
    const newPatient = await Patient.create({
      name,
      age,
      gender,
      phone,
      doctor
    });
    res.status(200).json({ newPatient,message: 'Patient created successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patient = await Patient.find();
    if(!patient || patient==0){
        return res.status(200).json({ error: "No Patient found" });
    }
    res.status(200).json({ patient, message: "Fetch all Patient data" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID provided. Please provide a valid ID for the update." });
    }
    const{name,age,gender,phone,doctor}=req.body;
    if(!name ||!age||!gender||!phone||!doctor){
        return res.status(400).json({ error: "Please provide all the fields" });
    }
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found with the provided ID." });
    }
    res.status(200).json({ updatedPatient, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deletePatient = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid ID provided. Please provide a valid ID for the deletion." });
      }
  
      const patientToDelete = await Patient.findById(id);
      if (!patientToDelete) {
          return res.status(404).json({ error: "Patient not found with the provided ID." });
      }
  
      const deletedPatient = await Patient.findByIdAndDelete(id);
     
      res.status(200).json({ deletedPatient, message: 'Patient deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = { createPatient, getPatients, updatePatient, deletePatient };
