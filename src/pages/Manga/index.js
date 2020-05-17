import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';

import Chip from '../../components/Chip';
import Reader from '../../components/Reader';
import api from '../../services/api';
import reauthenticate from '../../util/reauthenticate';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  rootgrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap-reverse'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  rootlist: {
    backgroundColor: theme.palette.background.paper,
  },
  info: {
    backgroundColor: 'inherit',
    listStyle: 'none',
    padding: 0,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  appBarSpacer: { minHeight: 72 }
}));

function Manga({match, location}) {
  const classes = useStyles();
  const [manga, setManga] = useState({ genres: [] });
  const [volumes, setVolumes] = useState([]);
  const [chapter, setChapter] = useState(undefined);

  useEffect(() => {
    async function loadChapter(id) {
      const querys = queryString.parse(location.search);
      const { data: manga } = await api.get(`/mangas/${id}`);
      setManga(manga);
      const { data: { docs: volumes } } = await api.get(`/volumes/${id}`);
      for (const volume of volumes) {
        const { data: { docs: chapters } } = await api.get(`/chapters/${volume._id}`);
        volume['chapters'] = chapters;
      }
      setVolumes(volumes);
      const { data: chapter } = await api.get(`/chapters/${querys.volume}/${querys.item}`);
      setChapter(chapter);
    }
    loadChapter(match.params.id);
  }, [match.params.id, location.search]);

  const auth = reauthenticate();
  if(auth) console.log(auth.name);

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} />
      <Grid container className={classes.rootgrid} spacing={1}>
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
          <Paper elevation={0} className={classes.paper}>
            <ListSubheader>Autor: {manga.author}</ListSubheader>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <ListSubheader>Gêneros:</ListSubheader>
            <Chip data={manga.genres} types={["mangas","genres"]} />
          </Paper>
          {volumes.map((volume, index) => (
            <li key={volume._id} className={classes.info}>
              <ul className={classes.info}>
                <Paper elevation={0} className={classes.paper}>
                  <ListSubheader>Capítulos:</ListSubheader>
                  { volume.chapters.length > 0 ? (
                    <Chip data={volume.chapters} types={["mangas","volume", "chapter"]} />
                  ) : (<div></div>) }
                </Paper>
              </ul>
            </li>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={8} xl={10}>
          <Paper elevation={0} className={classes.paper}>
            <Typography component="h5" variant="h5" color="textSecondary">{manga.title}</Typography>
            <Typography component="p" variant="body2" color="textSecondary">{manga.sinopse}</Typography>
          </Paper>
          { chapter ? (
            <Paper elevation={0} className={classes.paper}>
              <Reader chapter={chapter}/>
            </Paper>
          ) : (<div></div>) }
        </Grid>
      </Grid>
    </div>
  );
}

export default Manga;
