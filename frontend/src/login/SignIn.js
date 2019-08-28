import React, { useState, useContext } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snacks from '../components/Snacks';
import Copyright from '../components/Copyright';
import UserContext from '../modules/UserContext';

// Server-side login url
const loginUrl = 'http://192.168.0.120:3000/auth/login';

// Styles
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  wrapperSubmit: {
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

// Main component
export default function SignIn(props) {
  const classes = useStyles();
  const SESSION = useContext(UserContext);

  // Form-state
  const [state, setState] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Error-state, for Snacks messages
  const [error, setError] = useState('');

  // Fetching-state, determines if the loader will be render
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = e => {
    e.preventDefault();
    setLoading(true);

    fetch(loginUrl, {
      method: 'POST',
      mode: 'cors',
      timeout: 3000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
      .then(res => res.json())
      .then(
        result => {
          setLoading(false);

          if (!result.success) {
            setError(result.message);
          } else {
            state.remember
              ? SESSION.setToken(result.token, 180)
              : SESSION.setToken(result.token);

            if (props.history.location.pathname === '/signin') {
              const location = {
                pathname: '/dashboard',
                state: { fromSignin: true }
              };
              props.history.replace(location);
            }
          }
        },
        error => {
          setLoading(false);
          setError('Conection problem, try again later');
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            handleSubmitForm(e);
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={e => {
              setState({ ...state, email: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.pasword}
            onChange={e => {
              setState({ ...state, password: e.target.value });
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={state.remember}
                onChange={e => {
                  setState({ ...state, remember: e.target.checked });
                }}
                color="primary"
              />
            }
            label="Remember me"
          />

          <div className={classes.wrapperSubmit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Sign In
            </Button>
            {loading && (
              <CircularProgress size={28} className={classes.submitProgress} />
            )}
          </div>

          <Grid container>
            <Grid item xs>
              <Link component={LinkRouter} to="/password-recovery">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={LinkRouter} to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {error && <Snacks message={error} resetError={() => setError('')} />}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
