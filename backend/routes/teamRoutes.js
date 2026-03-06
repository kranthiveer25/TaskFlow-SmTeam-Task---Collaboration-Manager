const express = require('express');
const router = express.Router();
const { createTeam } = require('../controllers/teamController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Only team leaders and admins can create teams
router.post('/', protect, authorizeRoles('admin', 'teamleader'), createTeam);

module.exports = router;