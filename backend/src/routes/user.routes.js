import express from 'express';
import loginController from '../controllers/login';

const userRoutes = express.Router();

// Test route
userRoutes.get('/', (req, res) => {
  res.send('You are in user route');
});

// Route for login
userRoutes.post('/login', loginController);

export default userRoutes;
