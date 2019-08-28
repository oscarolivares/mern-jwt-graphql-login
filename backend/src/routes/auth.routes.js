import express from 'express';
import loginController from '../controllers/login';

const authRoutes = express.Router();

// Route for login
authRoutes.post('/login', loginController);

export default authRoutes;
