import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.gdoscomputacion.com.ve/">
        GDOS
      </Link>{' '}
      {new Date().getFullYear()}
      {'. All Rights Reserved '}
      {/* {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link> */}
    </Typography>
  );
}

export default Copyright;
