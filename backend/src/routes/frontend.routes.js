import path from 'path';
import express from 'express';

const frontendRoutes = express.Router();

// All others
frontendRoutes.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default frontendRoutes;
