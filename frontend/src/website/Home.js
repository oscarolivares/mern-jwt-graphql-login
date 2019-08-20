import React from 'react';
import { makeStyles } from '@material-ui/core';

import NavBar from './components/NavBar';
import HomeContent from './components/HomeContent';
import Copyright from '../components/Copyright';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  /* Preparar el espacio para fijar el footer al final de la pag */
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },

  /* Centrando vertical del contenido */
  content: {
    marginTop: 'auto'
  },

  /* Enviar footer al final de la pag */
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white'
  }
}));

function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Se encierra el NavBar porque perjudica el ejecto del footer fijo */}
      <header className={classes.header}>
        <NavBar />
      </header>

      <main className={classes.content}>
        <HomeContent />
      </main>

      <footer className={classes.footer}>
        <Copyright className={classes.footer} />
      </footer>
    </div>
  );
}

export default Home;
