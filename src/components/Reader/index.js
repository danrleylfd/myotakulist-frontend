import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  mangaDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  mangaPages: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  page: {
    width: '100%',
    maxWidth: 700,
    margin: 3,
    borderRadius: 4,
    boxShadow: '0px 1px 4px black'
  }
}));

function Reader({chapter}) {
  const classes = useStyles();
  return (
    <div className={classes.mangaDetails}>
      <div className={classes.mangaPages}>
        {chapter.pages.map((page, index) => (
          <img className={classes.page} src={page} key={index} alt={index} />
        ))}
      </div>
    </div>
  );
}

export default Reader;
