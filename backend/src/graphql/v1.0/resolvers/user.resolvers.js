import User from '../../../models/User';
import testPasswordStrength from '../../../helpers/testPasswordStrength';

export const resolvers = {
  Query: {
    async Users() {
      return await User.find();
    },

    async User(_, { _id }) {
      return await User.findById(_id);
    },

    async UserByEmail(_, { email }) {
      return await User.findOne({ email });
    }
  },
  Mutation: {
    async createUser(_, { input }) {
      if (testPasswordStrength(input.password) === 'high') {
        const newUser = new User(input);
        try {
          await newUser.save();
          return newUser;
        } catch (err) {
          return null;
        }
      }
      return null;
    },

    async updateUser(_, { _id, input }) {
      if (input.password) {
        if (testPasswordStrength(input.password) === 'high') {
          return await User.findByIdAndUpdate(_id, input, { new: true });
        }
      } else {
        return await User.findByIdAndUpdate(_id, input, { new: true });
      }
    },

    async deleteUser(_, { _id }) {
      return await User.findByIdAndDelete(_id);
    }
  }
};
