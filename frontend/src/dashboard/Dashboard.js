import React from 'react';
import { Link } from 'react-router-dom';

function DashboardBase(props) {
  return (
    <>
      <h2>Restricted Area</h2>
      <Link to="/">HOME</Link>
    </>
  );
}

export default DashboardBase;
