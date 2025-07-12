const Registration = require('../models/Registration');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Get all registrations
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

// Get a single registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ error: 'Registration not found' });
    res.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ error: 'Failed to fetch registration' });
  }
};

// Create a new registration with PDF upload
exports.createRegistration = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      address,
      city,
      state,
      worksDone,
      contributionsAchievements,
      occupation
    } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !email || !address || !city || !state || !occupation) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate PDF
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: 'Resume PDF is required' });
    }

    const resumeFile = req.files.resume;

    // Validate file is a PDF
    if (resumeFile.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: 'Resume must be a PDF file' });
    }

    // Use the existing imageUploader function to upload PDF
    // The resource_type: "auto" in the function will handle PDF files correctly
    const uploadResult = await uploadImageToCloudinary(resumeFile, 'registrations/resumes');

    // Create a new registration
    const registration = new Registration({
      name,
      phoneNumber,
      email,
      resumeUrl: uploadResult.secure_url,
      address,
      city,
      state,
      worksDone: worksDone || '',
      contributionsAchievements: contributionsAchievements || '',
      occupation
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ error: error.message || 'Failed to create registration' });
  }
};