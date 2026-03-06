const express = require('express');
const router = express.Router();
const { createTeam, addMember } = require('../controllers/teamController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('admin', 'teamleader'), createTeam);
router.post('/:teamId/members', protect, authorizeRoles('admin', 'teamleader'), addMember);

module.exports = router;
