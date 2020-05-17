import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  animeDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  player: {
    borderRadius: 4,
    width: '100%'
  }
}));

function Player({video}) {
  const classes = useStyles();
  return (
    <div className={classes.animeDetails}>
      <video className={classes.player} controls src={video.url} type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;
