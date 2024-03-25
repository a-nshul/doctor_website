const express = require('express');
const { createPatient, getPatients, updatePatient, deletePatient } = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticateUser);

router.post('/', createPatient);
router.get('/', getPatients);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
