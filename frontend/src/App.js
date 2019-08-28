import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './website/Home';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';
import PasswordRecovery from './login/PasswordRecovery';
import Dashboard from './dashboard/Dashboard';
import UserContext from './modules/UserContext';
import { getCookie, setCookie } from './modules/cookieManager';

function App() {
  const cookieToken = getCookie('x-access-token');

  // Funcion que se pasara al context para actualizar el token
  const setToken = (newToken, expDays) => {
    setCookie('x-access-token', newToken, expDays);
    setState({ ...state, token: newToken });
  };

  // Fuente de la verdad para el UserContext
  const [state, setState] = useState({
    token: cookieToken,
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
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route
            path="/dashboard"
            render={props =>
              state.token ? <Dashboard {...props} /> : <SignIn {...props} />
            }
          />
        </Switch>
      </UserContext.Provider>
    </>
  );
}

export default App;
