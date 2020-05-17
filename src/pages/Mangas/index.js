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

function Mangas({match}) {
  const classes = useStyles();
  const [mangas, setMangas] = useState([]);
  const { genres } = match.params;
  useEffect(() => {
    async function loadMangas(genres) {
      const { data } = (genres)
        ? await api.get('/mangas', { params: { genres } })
        : await api.get('/mangas');
      const { docs: mangas, ...pageInfo } = data;
      setMangas(mangas);
    }
    loadMangas(genres);
  }, [genres]);

  const auth = reauthenticate();
  if(auth) console.log(auth.name);

  return (
    <Container>
      <div className={classes.appBarSpacer} />
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

export default Mangas;
