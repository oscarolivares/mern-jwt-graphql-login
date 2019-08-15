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

/* export const resolvers = {
  Query: {
    test1: () => {
      return 'Método de objeto definido con la sintáxis de ES5';
    },
    test2() {
      return 'Método de objeto definido con la sintáxis de ES6';
    },
    test3(root, args) {
      return `Query que recibe argumentos, el argumento fue: ${args.name}`;
    },
    test4(root, { name }) {
      return `Ahora se usa el detructuring para especificar el argumento, el argumento fue: ${name}`;
    },
    test5(root, { name }, ctx) {
      console.log(ctx);
      return 'Prueba de pase de parametro de contexto desde el index.js al resolver';
    },

    tasks() {
      return tasks;
    },

    async Users() {
      return await User.find();
    }
  },
  Mutation: {
    createTask(_, { input }) {
      input._id = tasks.length;
      tasks.push(input);
      return input;
    },
    async createUser(_, { input }) {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    },
    async deleteUser(_, { _id }) {
      return await User.findByIdAndDelete(_id);
    },
    async updateUser(_, { _id, input }) {
      return await User.findByIdAndUpdate(_id, input, { new: true });
      // el ultimo parametro-opcion { new:true } es para retornar el
      // nuevo objeto (luego del update) en lugar del anterior
    }
  }
}; */
