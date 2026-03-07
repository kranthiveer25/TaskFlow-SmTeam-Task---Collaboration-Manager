const logActivity = require('../utils/activityLogger');
const Task = require('../models/Task');
const TeamMember = require('../models/TeamMember');


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
    await logActivity(req.user._id, task._id, 'Task created');

    res.status(201).json({ message: 'Task created successfully', task });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTasks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
  
      const total = await Task.countDocuments();
      const tasks = await Task.find()
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email')
        .populate('team', 'name')
        .skip(skip)
        .limit(limit);
  
      res.json({
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
const updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      // Validate status
      const validStatuses = ['pending', 'inprogress', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: 'Invalid status. Must be pending, inprogress or completed' 
        });
      }
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  

      const isAssigned = task.assignedTo.toString() === req.user._id.toString();
      const isLeader = req.user.role === 'teamleader' || req.user.role === 'admin';
  
      if (!isAssigned && !isLeader) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }
  
      task.status = status;
      await task.save();
      await logActivity(req.user._id, task._id, `Status updated to ${status}`);
  
      res.status(200).json({ message: 'Task status updated', task });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Only team leader or admin can delete tasks
      const isLeader = req.user.role === 'teamleader' || req.user.role === 'admin';
      if (!isLeader) {
        return res.status(403).json({ message: 'Not authorized to delete this task' });
      }
  
      await task.deleteOne();
  
      res.status(200).json({ message: 'Task deleted successfully' });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
const searchTasks = async (req, res) => {
    try {
      const { status, priority, assignedTo, keyword } = req.query;
  
      // Build filter object dynamically
      const filter = {};
  
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      if (assignedTo) filter.assignedTo = assignedTo;
      if (keyword) {
        filter.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ];
      }
  
      const tasks = await Task.find(filter)
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email')
        .populate('team', 'name');
  
      res.status(200).json({ count: tasks.length, tasks });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  module.exports = { createTask, getTasks, updateTaskStatus, deleteTask, searchTasks };