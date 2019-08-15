## Graphiql

    query getUsersList{
      Users {
        _id,
        email,
        password,
        role,
        firstName,
        LastName
      }
    }

    query getUserById{
      User(_id: "5d53d68b8e423b03c4e4eb30") {
        _id,
        email,
        password,
        role,
      }
    }

    query getUserByEmail{
      UserByEmail(email: "amdin@mail.com") {
        _id,
        email,
        password,
        role,
      }
    }

    mutation createUser{
      createUser(input: {
        email: "test@mail.com"
        password: "Test123.."
      }) {
        _id,
        email,
        password,
        role,
      }
    }

    mutation updateUser{
      updateUser(_id: "5d53d68b8e423b03c4e4eb30", input: {
        password: "Password123.."
      }) {
        _id,
        email,
        password,
        role,
      }
    }

    mutation deleteUser{
      deleteUser(_id:"5d53d82f8e423b03c4e4eb33") {
        _id,
        email,
        password,
        role,
      }
    }
