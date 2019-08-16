/* Send a token when user is login in */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res) => {
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
};
