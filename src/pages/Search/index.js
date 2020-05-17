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

function Search({match}) {
  const classes = useStyles();
  const { title } = match.params;
  const [animes, setAnimes] = useState([]);
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    async function loadAnimes() {
      const { data } = await api.get('/animes', { params: { limit: 10, title } });
      const { docs: animes, ...pageInfo } = data;
      setAnimes(animes);
    }
    loadAnimes();
  }, [title]);

  useEffect(() => {
    async function loadMangas() {
      const { data } = await api.get('/mangas', { params: { limit: 10, title } });
      const { docs: mangas, ...pageInfo } = data;
      setMangas(mangas);
    }
    loadMangas();
  }, [title]);

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
      {mangas.length > 0 ? (
        <>
          <Typography color="textPrimary" style={{ textAlign: 'center' }} component="h5" variant="h5">Mangás</Typography>
          <Grid container spacing={1}>
            { mangas.map(manga => (
              <Card key={manga._id} user={auth} data={manga} type="mangas" />
            ))}
          </Grid>
        </>
      ) : (<Typography color="textPrimary" style={{ textAlign: 'center' }} component="h6" variant="subtitle2">¯\_(ツ)_/¯</Typography>)}
    </Container>
  );
}

export default Search;
