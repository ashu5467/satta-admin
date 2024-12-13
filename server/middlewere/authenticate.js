const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Lowercase "authorization"
  if (!authHeader) {
    console.log('Authorization Header Missing');
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
  if (!token) {
    console.log('Token Missing');
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use your secret
    req.user = decoded; // Attach decoded token to `req.user`
    console.log('Decoded Token:', decoded); // Debugging
    next();
  } catch (error) {
    console.error('Token Error:', error.message); // Log the exact error
    res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

module.exports = authenticate;
