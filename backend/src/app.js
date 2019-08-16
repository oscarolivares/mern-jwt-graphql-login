import path from 'path';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/user.routes';
import graphqlRoutes from './routes/graphql.routes';

const app = express();

// Setings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({ origin: 'http://192.168.0.114:4000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.get('/', (req, res) => {
  res.send('HomePage');
});

app.use('/users', userRoutes);
app.use('/graphql', graphqlRoutes);

// Middlewares for errors
app.use(function(req, res, next) {
  res.status(404).send('Sorry, cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
