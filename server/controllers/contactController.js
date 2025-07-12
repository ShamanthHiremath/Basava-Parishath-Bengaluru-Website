const Contact = require('../models/Contact');

exports.saveContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts - for admin dashboard
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact message
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Contact message not found' });
    }
    
    res.json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};