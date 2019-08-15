import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type Query {
    Users: [User]
    User(_id: String): User
    UserByEmail(email: String): User
  }

  type User {
    _id: ID
    email: String
    password: String
    role: String
    firstName: String
    LastName: String
  }

  type Mutation {
    createUser(input: UserInput): User
    deleteUser(_id: ID): User
    updateUser(_id: ID, input: UserInputForUpdate): User
  }

  input UserInput {
    email: String!
    password: String!
    role: String
    firstName: String
    lastName: String
  }

  input UserInputForUpdate {
    email: String
    password: String
    role: String
    firstName: String
    lastName: String
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
