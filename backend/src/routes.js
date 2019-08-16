import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User';

const Routes = express.Router();

Routes.get('/', (req, res) => {
  res.redirect('graphql/v1.0/users');
});

// Route for login an user
Routes.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    const user = await User.findOne({ email });

    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        const token = jwt.sign({ user }, 'SECRET');
        /* res.header('x-access-token', token); */
        res.json({ success: true, token });
      }
      res.json({ success: false, message: 'Password did not match' });
    }
    res.json({ success: false, message: 'User does not exist' });
  }

  res.json({ success: false, message: 'Required data was not provided' });
});

// Authentication middleware
Routes.use((req, res, next) => {
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
});

Routes.get('/test', (req, res) => {
  res.send(req.decoded);
});

export default Routes;
