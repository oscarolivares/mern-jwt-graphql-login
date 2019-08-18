import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './components/session/Login';
import SignUp from './components/session/SignUp';
import PasswordRecovery from './components/session/PasswordRecovery';

import Home from './components/onepirate/Home';

function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/password-reovery" component={PasswordRecovery} />
      </Switch>
    </>
  );
}

export default App;
