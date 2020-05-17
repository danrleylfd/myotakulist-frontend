import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Animes from '../Animes';
import Mangas from '../Mangas';

const useStyles = makeStyles(theme => ({
  appBarSpacer: { minHeight: 70 }
}));

function Home() {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.appBarSpacer} />
      <Animes match={{ params: { genres: false } }} />
      <Mangas match={{ params: { genres: false } }} />
    </Container>
  );
}

export default Home;
