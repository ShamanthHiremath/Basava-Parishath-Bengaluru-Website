const Team = require('../models/Team');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

// Get all team members (public)
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find().sort({ order: -1, createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get single team member by ID (public)
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
};

// Create a new team member (admin only)
exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, description } = req.body;

    // Validate required fields
    if (!name || !position || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if image was uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Team member image is required' });
    }

    // Upload image to Cloudinary
    const imageFile = req.files.image;
    const uploadResult = await uploadImageToCloudinary(
      imageFile, 
      "Team Basava Parishath",
      400, // height
      80 // quality
    );

    // Create new team member with Cloudinary image URL
    const teamMember = new Team({
      name,
      position,
      description,
      image: uploadResult.secure_url
    });

    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: error.message || 'Failed to create team member' });
  }
};

// Update team member (admin only)
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, position, description, order } = req.body;
    const updates = { name, position, description };
    
    // Add order if provided
    if (order !== undefined) {
      updates.order = order;
    }

    // Check if image was uploaded
    if (req.files && req.files.image) {
      // Upload new image to Cloudinary
      const imageFile = req.files.image;
      const uploadResult = await uploadImageToCloudinary(
        imageFile, 
        "Team Basava Parishath",
        400, // height
        80 // quality
      );
      
      updates.image = uploadResult.secure_url;
      
      // Note: We don't need to delete old images from Cloudinary in this implementation
      // If you want to, you would need to extract the public_id from the URL and use cloudinary.uploader.destroy()
    }

    const teamMember = await Team.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json(teamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: error.message || 'Failed to update team member' });
  }
};

// Delete team member (admin only)
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    // Note: We're not deleting the image from Cloudinary here
    // If you want to, you would need to extract the public_id from the URL and use cloudinary.uploader.destroy()

    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

// Update team member order (admin only)
exports.updateTeamOrder = async (req, res) => {
  try {
    const { orderUpdates } = req.body;
    
    if (!orderUpdates || !Array.isArray(orderUpdates)) {
      return res.status(400).json({ error: 'Invalid order updates' });
    }

    // Update each team member's order
    const updatePromises = orderUpdates.map(item => {
      return Team.findByIdAndUpdate(
        item.id,
        { $set: { order: item.order } },
        { new: true }
      );
    });

    await Promise.all(updatePromises);
    
    const updatedTeam = await Team.find().sort({ order: 1, createdAt: -1 });
    res.json(updatedTeam);
  } catch (error) {
    console.error('Error updating team order:', error);
    res.status(500).json({ error: 'Failed to update team order' });
  }
};