const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/create-order', donationController.createOrder);
router.post('/save-donation', donationController.saveDonation);

module.exports = router; 