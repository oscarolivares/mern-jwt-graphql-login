import path from 'path';
import express from 'express';
import cors from 'cors';

import graphqlHTTP from 'express-graphql';
import schema from './graphql/v1.0/schema';

const app = express();

// Setings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({ origin: 'http://192.168.0.114:4000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.get('/', (req, res) => {
  res.redirect('/graphql/v1.0/users');
});

// API Graphql
app.use(
  '/graphql/v1.0/users',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      message: 'Test context'
    }
  })
);

// Middlewares for errors
app.use(function(req, res, next) {
  res.status(404).send('Sorry, cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
