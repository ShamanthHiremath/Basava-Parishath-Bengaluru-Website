const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const verifyToken  = require('../middleware/auth');

// Public routes
router.post('/', registrationController.createRegistration); // Allow anyone to register

// Protected routes - only admins can view registrations
router.get('/', verifyToken, registrationController.getRegistrations);
router.get('/:id', verifyToken, registrationController.getRegistrationById);

module.exports = router;