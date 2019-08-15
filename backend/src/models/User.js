import { Schema, model } from 'mongoose';

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

export default model('User', userSchema);
