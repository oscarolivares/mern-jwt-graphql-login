import jwt from 'jsonwebtoken';
import User from '../models/User';

// Authentication required middleware
export default (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'SECRET', (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Authentication fail' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(404).json({ success: false, message: 'Invalid token' });
  }
};
