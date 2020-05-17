import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import BookIcon from '@material-ui/icons/Book';
import MovieIcon from '@material-ui/icons/Movie';
import React from 'react';

const useStyles = makeStyles(theme => ({
  chips: {
    userSelect: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

function Tag({data, types = []}) {
  const classes = useStyles();
  if(types[1] === 'genres') {
    return (
      <div className={classes.chips}>
        {data.map((item, pos) => (
          <Chip
            key={pos}
            label={item}
            size="small"
            color="secondary"
            clickable
            component="a"
            variant="outlined"
            href={`/${types[0]}-by-genres/${item}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.chips}>
      {data.map(item => (
        <Chip
          key={item._id}
          label={item.title}
          icon={types[1] === 'season' ? <MovieIcon /> : <BookIcon />}
          size="small"
          color="secondary"
          clickable
          component="a"
          variant="outlined"
          href={`?${types[1]}=${item[types[1]]["_id"]}&item=${item._id}&type=${types[2]}`}
        />
      ))}
    </div>
  );
}

export default Tag;