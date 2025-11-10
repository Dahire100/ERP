// middleware/auth.js
const jwt = require('jsonwebtoken');
const { db } = require('../config/db');

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    // Verify user exists and is active in database
    const query = `SELECT id, email, role, firstName, lastName, phone, schoolId, isActive 
                   FROM users WHERE id = ? AND isActive = 1`;
    
    db.get(query, [decoded.userId], (err, user) => {
      if (err || !user) {
        return res.status(403).json({ error: 'User not found or inactive.' });
      }
      
      req.user = { ...decoded, ...user };
      next();
    });
  });
};

exports.requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Super admin access required.' });
  }
  next();
};

exports.requireSchoolAdmin = (req, res, next) => {
  if (req.user.role !== 'school_admin') {
    return res.status(403).json({ error: 'School admin access required.' });
  }
  next();
};