import User from '../../models/User';

function testPasswordStrength(password) {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,])(?=.{8,})'
  );
  const mediumRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
  );

  if (strongRegex.test(password)) {
    return 'high';
  } else if (mediumRegex.test(password)) {
    return 'med';
  } else {
    return 'low';
  }
}

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
        await newUser.save();
        return newUser;
      } else {
        return null;
      }
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
