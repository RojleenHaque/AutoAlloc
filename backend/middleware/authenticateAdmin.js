const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => { // Verify token
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.admin = decoded; // Attach decoded admin info to the request object
    next(); // Proceed to the next middleware/route handler
  });
};

module.exports = authenticateAdmin;
