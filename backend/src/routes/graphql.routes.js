import express from 'express';
import graphqlHTTP from 'express-graphql';

import userSchema from '../graphql/v1.0/schemas/user.schema';
import authRequired from '../middlewares/authRequired';

const graphqlRoutes = express.Router();

// Test route (without restricted access)
graphqlRoutes.use(
  '/v1.0/users/test',
  graphqlHTTP({
    graphiql: true,
    schema: userSchema,
    context: {
      message: 'Test context'
    }
  })
);

graphqlRoutes.use(
  '/v1.0/users',
  authRequired,
  // Restricted area
  graphqlHTTP({
    schema: userSchema
  })
);

export default graphqlRoutes;
