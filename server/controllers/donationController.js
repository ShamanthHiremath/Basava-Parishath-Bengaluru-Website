const Razorpay = require('razorpay');
const Donation = require('../models/Donation');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: receipt || `rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveDonation = async (req, res) => {
  try {
    const { amount, paymentId } = req.body;
    if (!amount || !paymentId) return res.status(400).json({ error: 'Missing amount or paymentId' });
    const donation = new Donation({ amount, paymentId });
    await donation.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 