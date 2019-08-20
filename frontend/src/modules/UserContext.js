import { createContext } from 'react';

const UserContext = createContext({
  token: '',
  setToken: () => {}
});

export default UserContext;
