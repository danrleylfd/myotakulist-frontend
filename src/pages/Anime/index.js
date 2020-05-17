import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';

import Chip from '../../components/Chip';
import Player from '../../components/Player';
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

function Anime({match, location}) {
  const classes = useStyles();

  const [anime, setAnime] = useState({ genres: [] });
  const [seasons, setSeasons] = useState([]);
  const [video, setVideo] = useState(undefined);

  useEffect(() => {
    async function loadAnime(title) {
      const querys = queryString.parse(location.search);
      const { data: anime } = await api.get(`/animes/${title}`);
      const { data: { docs: seasons } } = await api.get(`/seasons/${anime._id}`);
      setAnime(anime);
      for (const season of seasons) {
        const { data: { docs: eps } } = await api.get(`/episodes/${season._id}`);
        const { data: { docs: ovs } } = await api.get(`/ovas/${season._id}`);
        const { data: { docs: mvs } } = await api.get(`/movies/${season._id}`);
        season['episodes'] = eps;
        season['ovas'] = ovs;
        season['movies'] = mvs;
      }
      setSeasons(seasons);
      const season = seasons.find(season => season._id === querys.season);
      let video = null;
      if(querys.type === 'episode') {
        if(video === null) video = season.episodes.find(episode => episode._id === querys.item);
      } else if(querys.type === 'ova') {
        if(video === null) video = season.ovas.find(ova => ova._id === querys.item);
      } else if(querys.type === 'movie') {
        if(video === null) video = season.movies.find(movie => movie._id === querys.item);
      }
      setVideo(video);
    }
    loadAnime(match.params.title);
  }, [match.params.title, location.search]);

  const auth = reauthenticate();
  if(auth) console.log(auth.name);

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} />
      <Grid container className={classes.rootgrid} spacing={1}>
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
          <Paper elevation={0} className={classes.paper}>
            <ListSubheader>Autor: {anime.author}</ListSubheader>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <ListSubheader>Estúdio: {anime.studio}</ListSubheader>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <ListSubheader>Gêneros:</ListSubheader>
            <Chip data={anime.genres} types={["animes","genres"]} />
          </Paper>
          {seasons.map((season, index) => (
            <li key={season._id} className={classes.info}>
              <ul className={classes.info}>
                <Paper elevation={0} className={classes.paper}>
                  <ListSubheader>{season.title} - {index+1}ª Temporada</ListSubheader>
                  { season.episodes.length > 0 ? (
                    <Paper elevation={0} className={classes.paper}>
                      <ListSubheader>Episódios:</ListSubheader>
                      <Chip data={season.episodes} types={["animes","season","episode"]} />
                    </Paper>
                  ) : (<div></div>) }
                  { season.ovas.length > 0 ? (
                    <Paper elevation={0} className={classes.paper}>
                      <ListSubheader>OVAs:</ListSubheader>
                      <Chip data={season.ovas} types={["animes","season","ova"]} />
                    </Paper>
                  ) : (<div></div>) }
                  { season.movies.length > 0 ? (
                    <Paper elevation={0} className={classes.paper}>
                      <ListSubheader>Filmes:</ListSubheader>
                      <Chip data={season.movies} types={["animes","season","movie"]} />
                    </Paper>
                  ) : (<div></div>) }
                </Paper>
              </ul>
            </li>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={8} xl={10}>
          <Paper elevation={0} className={classes.paper}>
            <Typography component="h5" variant="h5" color="textSecondary">{anime.title}</Typography>
            <Typography component="p" variant="body2" color="textSecondary">{anime.sinopse}</Typography>
          </Paper>
          { video ? (
            <Paper elevation={0} className={classes.paper}>
              <Player video={video}/>
            </Paper>
          ) : (<div></div>) }
        </Grid>
      </Grid>
    </div>
  );
}

export default Anime;
