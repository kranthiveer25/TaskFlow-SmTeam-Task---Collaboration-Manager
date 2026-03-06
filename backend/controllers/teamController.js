const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');
const User = require('../models/User');

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    const team = await Team.create({
      name,
      description,
      leader: req.user._id
    });

    await TeamMember.create({
      team: team._id,
      user: req.user._id
    });

    res.status(201).json({ message: 'Team created successfully', team });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    if (team.leader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only team leader can add members' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingMember = await TeamMember.findOne({ team: teamId, user: userId });
    if (existingMember) {
      return res.status(400).json({ message: 'User is already a team member' });
    }

    await TeamMember.create({ team: teamId, user: userId });

    res.status(201).json({ message: 'Member added successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTeam, addMember };