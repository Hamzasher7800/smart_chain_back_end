const User = require('../Model/Users'); // Adjust the path to your User model

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { name: req.params.userName },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};
