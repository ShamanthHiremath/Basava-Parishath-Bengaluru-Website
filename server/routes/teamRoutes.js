const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);

// Protected routes (admin only)
router.post('/', auth, teamController.createTeamMember);
router.put('/:id', auth, teamController.updateTeamMember);
router.delete('/:id', auth, teamController.deleteTeamMember);
router.post('/order', auth, teamController.updateTeamOrder);

module.exports = router;