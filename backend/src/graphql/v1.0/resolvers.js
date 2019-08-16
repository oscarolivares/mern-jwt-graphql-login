import User from '../../models/User';
import bcrypt from 'bcrypt';

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
    },

    async Login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
          return 'success';
        }
        return 'Password did not match';
      }
      return 'User does not exist';
    }
  },
  Mutation: {
    async createUser(_, { input }) {
      if (testPasswordStrength(input.password) === 'high') {
        const newUser = new User(input);
        await newUser.save(err => {
          if (err) {
            return null;
          }
        });
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
