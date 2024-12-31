const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-secret';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Authentication required' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
