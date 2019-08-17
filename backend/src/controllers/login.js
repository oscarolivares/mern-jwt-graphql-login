/* Send a token when user is login in */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';

export default async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    try {
      const user = await User.findOne({ email });

      if (user) {
        const passMatch = await bcrypt.compare(password, user.password);

        if (passMatch) {
          const token = await jwt.sign({ user }, config.SECRET, {
            expiresIn: 60 * 60
          });
          /* res.header('x-access-token', token); */
          res.json({ success: true, token });
        } else {
          res.json({ success: false, message: 'Password did not match' });
        }
      } else {
        res.json({ success: false, message: 'User does not exist' });
      }
    } catch (err) {
      res.json({ success: false, message: 'Internal error' });
    }
  } else {
    res.json({ success: false, message: 'Required data was not provided' });
  }
};
