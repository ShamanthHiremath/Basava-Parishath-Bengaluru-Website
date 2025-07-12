const Event = require('../models/Event');
const cloudinary = require('cloudinary').v2;
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Get all events (sorted by date, newest first)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create a new event with photo upload
exports.createEvent = async (req, res) => {
  try {
    const { name, date, venue, description } = req.body;

    // Validate required fields
    if (!name || !date || !venue || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Upload photos if provided
    let photos = [];
    if (req.files && req.files.photos) {
      // Handle both single file and multiple files
      const photoFiles = Array.isArray(req.files.photos) 
        ? req.files.photos 
        : [req.files.photos];
      
      // Upload each photo to cloudinary
      for (const file of photoFiles) {
        const result = await uploadImageToCloudinary(
          file,
          "Events Basava Parishath",
          1200, // height
          80 // quality
        );
        photos.push(result.secure_url);
      }
    }

    // Create and save event
    const event = new Event({
      name,
      date,
      venue,
      description,
      photos
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message || 'Failed to create event' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { name, date, venue, description, existingPhotos } = req.body;
    
    // Find existing event
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    // Prepare update object
    const updates = {};
    if (name) updates.name = name;
    if (date) updates.date = date;
    if (venue) updates.venue = venue;
    if (description) updates.description = description;
    
    // Handle photos
    let finalPhotos = [];
    
    // Keep existing photos that weren't removed
    if (existingPhotos) {
      // Convert to array if it's a string
      finalPhotos = Array.isArray(existingPhotos) ? [...existingPhotos] : [existingPhotos];
    } else {
      // If existingPhotos is not provided, keep all current photos
      finalPhotos = [...event.photos];
    }
    
    // Add new photos if uploaded
    if (req.files && req.files.photos) {
      // Handle both single file and multiple files
      const photoFiles = Array.isArray(req.files.photos) 
        ? req.files.photos 
        : [req.files.photos];
      
      // Upload each new photo to cloudinary
      for (const file of photoFiles) {
        const result = await uploadImageToCloudinary(
          file,
          "Events Basava Parishath",
          1200, // height
          80 // quality
        );
        finalPhotos.push(result.secure_url);
      }
    }
    
    // Update photos array
    updates.photos = finalPhotos;
    
    // Save the updated event
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: error.message || 'Failed to update event' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    // Delete the event
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};