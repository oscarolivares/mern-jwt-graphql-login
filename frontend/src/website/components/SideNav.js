import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Lock from '@material-ui/icons/Lock';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Dashboard from '@material-ui/icons/Dashboard';

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

export default function SideNav(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {props.SESSION.token ? (
          <>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon children={<Dashboard />} />
              <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />

            <ListItem button onClick={() => props.SESSION.setToken('')}>
              <ListItemIcon children={<ExitToApp />} />
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/signin">
            <ListItemIcon children={<Lock />} />
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
      </List>
    </div>
  );
}
