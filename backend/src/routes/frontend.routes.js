import path from 'path';
import express from 'express';
import authRequired from '../middlewares/authRequired';

const frontendRoutes = express.Router();

// Login required routes
frontendRoutes.use('/dashboard', authRequired);

// All others
frontendRoutes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default frontendRoutes;
