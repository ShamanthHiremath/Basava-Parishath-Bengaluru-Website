const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', contactController.saveContact);

// Protected routes (admin only)
router.get('/', auth, contactController.getAllContacts);
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;