import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../modules/UserContext';

function DashboardBase(props) {
  const SESSION = useContext(UserContext);

  return (
    <>
      <h2>Restricted Area</h2>
      <p>Token: {SESSION.token}</p>
      <Link to="/">Return to HOME</Link>
    </>
  );
}

export default DashboardBase;
