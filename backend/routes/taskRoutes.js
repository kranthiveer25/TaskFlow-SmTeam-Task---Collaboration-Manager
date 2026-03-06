const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', protect, authorizeRoles('admin', 'teamleader'), createTask);
router.get('/', protect, getTasks);
router.patch('/:taskId/status', protect, updateTaskStatus);

module.exports = router;