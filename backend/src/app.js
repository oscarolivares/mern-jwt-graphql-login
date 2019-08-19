import path from 'path';
import express from 'express';
import cors from 'cors';
import config from './config';

import userRoutes from './routes/user.routes';
import graphqlRoutes from './routes/graphql.routes';
import frontendRoutes from './routes/frontend.routes';

const app = express();

// Setings
app.set('port', config.PORT);

// Middlewares
if (config.CORS) {
  app.use(cors({ origin: config.CORS_ORIGIN }));
}
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Internal routes
app.use('/users', userRoutes);
app.use('/graphql', graphqlRoutes);

// Client side routes
app.use('/', frontendRoutes);

// Middlewares for errors
app.use(function(req, res, next) {
  res.status(404).send("Sorry, can't find that!");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
