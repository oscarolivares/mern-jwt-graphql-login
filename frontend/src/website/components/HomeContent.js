import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  h2: {
    marginBottom: theme.spacing(10)
    /* [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10)
    } */
  },
  h5: {
    marginBottom: theme.spacing(4)
  },
  more: {
    marginTop: theme.spacing(2)
  }
}));

export default function HomeContent() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" className={classes.h2}>
        Home Page
      </Typography>
      <Typography variant="h5" className={classes.h5}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
        molestias ratione aliquam vero
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={Link}
        to="/signup"
      >
        Register
      </Button>
      <Typography variant="body2" className={classes.more}>
        Discover the experience
      </Typography>
    </Container>
  );
}
