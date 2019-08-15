import User from '../../models/User';

export const resolvers = {
  Query: {
    test1: () => {
      return 'Graphql ready';
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
