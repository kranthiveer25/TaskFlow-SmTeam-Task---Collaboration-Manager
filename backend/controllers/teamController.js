const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');

// @desc    Create a new team
// @route   POST /api/teams
const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    // Create team with logged-in user as leader
    const team = await Team.create({
      name,
      description,
      leader: req.user._id
    });

    // Automatically add creator as team member
    await TeamMember.create({
      team: team._id,
      user: req.user._id
    });

    res.status(201).json({
      message: 'Team created successfully',
      team
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTeam };