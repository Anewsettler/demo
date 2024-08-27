const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username, password } });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const token = generateToken(user.id, user.username);
  return token;
};

const generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  authenticateUser,
  generateToken,
  verifyToken,
};
