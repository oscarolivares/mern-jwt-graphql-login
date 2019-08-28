import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

import SideNav from './SideNav';

import UserContext from '../../modules/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  loginLinks: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const SESSION = useContext(UserContext);

  // State of Drawer (SideNav)
  const [drawerState, setDrawerState] = useState(false);

  // Toogle Drawer controller
  const toggleDrawer = signal => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(signal);
  };

  /* Navigation controls
    If the user have a token display Logout and Dashboar buttons, else display a Login button.
    Only for <sm Media Queries, for >sm the SideNav take the control */
  const controls = () => {
    if (SESSION.token) {
      return (
        <>
          <Hidden smDown>
            <Button color="inherit" onClick={() => SESSION.setToken('', -100)}>
              Sign Out
            </Button>
          </Hidden>
          <Hidden smDown>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          </Hidden>
        </>
      );
    }
    return (
      <Hidden smDown>
        <Button color="inherit" component={Link} to="/signin">
          Sign In
        </Button>
      </Hidden>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Navbar Brand */}
          <Typography variant="h6" className={classes.title}>
            Brand
          </Typography>

          {/* Burger Menu, toole de SideNav for mobile */}
          <Hidden mdUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          {/* Navigation controls for pc */}
          {controls()}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerState} onClose={toggleDrawer(false)}>
        <SideNav toggleDrawer={toggleDrawer} SESSION={SESSION} />
      </Drawer>
    </div>
  );
}
