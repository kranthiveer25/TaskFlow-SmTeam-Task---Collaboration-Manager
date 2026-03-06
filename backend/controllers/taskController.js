const Task = require('../models/Task');
const TeamMember = require('../models/TeamMember');

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, teamId, assignedTo } = req.body;

    if (!title || !teamId || !assignedTo) {
      return res.status(400).json({ message: 'Title, team and assignedTo are required' });
    }

    // Check if assigned user is a member of the team
    const isMember = await TeamMember.findOne({ team: teamId, user: assignedTo });
    if (!isMember) {
      return res.status(400).json({ message: 'Assigned user is not a member of this team' });
    }

    const task = await Task.create({
      title,
      description,
      priority: priority || 'medium',
      deadline,
      team: teamId,
      assignedTo,
      createdBy: req.user._id,
      status: 'pending'
    });

    res.status(201).json({ message: 'Task created successfully', task });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask };