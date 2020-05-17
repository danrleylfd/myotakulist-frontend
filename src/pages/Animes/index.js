import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';

import Card from '../../components/Card';
import api from '../../services/api';
import reauthenticate from '../../util/reauthenticate';

const useStyles = makeStyles(theme => ({
  appBarSpacer: { minHeight: 70 }
}));

function Animes({match}) {
  const classes = useStyles();
  const [animes, setAnimes] = useState([]);
  const { genres } = match.params;
  useEffect(() => {
    async function loadAnimes(genres) {
      const { data } = (genres)
        ? await api.get('/animes', { params: { genres } })
        : await api.get('/animes');
      const { docs: animes, ...pageInfo } = data;
      setAnimes(animes);
    }
    loadAnimes(genres);
  }, [genres]);

  const auth = reauthenticate();
  if(auth) console.log(auth.name);

  return (
    <Container>
      <div className={classes.appBarSpacer} />
      {animes.length > 0 ? (
        <>
          <Typography color="textPrimary" style={{ textAlign: 'center' }} component="h5" variant="h5">Animes</Typography>
          <Grid container spacing={1}>
            { animes.map(anime => (
              <Card key={anime._id} user={auth} data={anime} type="animes" />
            ))}
          </Grid>
        </>
      ) : (<Typography color="textPrimary" style={{ textAlign: 'center' }} component="h6" variant="subtitle2">¯\_(ツ)_/¯</Typography>)}
    </Container>
  );
}

export default Animes;
