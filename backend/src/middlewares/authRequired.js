import jwt from 'jsonwebtoken';
import config from '../config';

// Authentication required middleware
export default (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.SECRET, (err, decoded) => {
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
