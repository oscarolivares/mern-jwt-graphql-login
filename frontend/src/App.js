import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './website/Home';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';
import PasswordRecovery from './login/PasswordRecovery';
import Dashboard from './dashboard/Dashboard';
import UserContext from './modules/UserContext';

function App() {
  const setToken = newToken => {
    setState({ ...state, token: newToken });
  };

  const [state, setState] = useState({
    token: '',
    setToken: setToken
  });

  return (
    <>
      <CssBaseline />
      <UserContext.Provider value={state}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/password-recovery" component={PasswordRecovery} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
