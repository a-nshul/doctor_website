const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_secret_key');

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = { authenticateUser };
