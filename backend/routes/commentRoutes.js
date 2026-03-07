const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:taskId', protect, addComment);
router.get('/:taskId', protect, getComments);

module.exports = router;