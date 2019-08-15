import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    match: /\S+@\S+\.\S+/,
    unique: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required']
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user'
  },
  firstName: String,
  lastName: String
});

userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if(err) {
      next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) {
        next(err)
      }
      user.password = hash;
      next();
    })
  })
});

export default model('User', userSchema);
