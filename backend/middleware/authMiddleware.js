const authService = require('../services/authService');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = authService.verifyToken(token);
      console.log('Authenticated user:', user);
      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(403); 
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
