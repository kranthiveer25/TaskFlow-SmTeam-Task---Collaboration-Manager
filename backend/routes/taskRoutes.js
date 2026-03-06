const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Only team leaders and admins can create tasks
router.post('/', protect, authorizeRoles('admin', 'teamleader'), createTask);

module.exports = router;