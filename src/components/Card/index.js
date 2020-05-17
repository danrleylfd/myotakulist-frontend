import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import reauthenticate from '../../util/reauthenticate';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: 3,
    width: '100%',
    minHeight: 180,
    maxHeight: 200
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    minWidth: 120,
    minHeight: '100%',
  },

});

function Cartao({user, data, type}) {
  const auth = reauthenticate();
  const classes = useStyles();
  const [like,setLike] = useState(false);
  useEffect(() => {
    async function loadLikes() {
      if(!user) return setLike(false);
      const [like] = data.likes.filter(like => like === auth._id);
      return (like) ? setLike(true) : setLike(false);
    }
    loadLikes();
  }, []);
  async function updateLike(user, data, type) {
    const curtir = async(url, content) => await api.post(url, content);
    const descurtir = async(url, content) => await api.delete(url, content);
    if(!user) return;
    const res = like === false
      ? await curtir(`/${type}/bookmarks/${data._id}`, { id: user._id })
      : await descurtir(`/${type}/bookmarks/${data._id}`, { id: user._id });
    setLike(res.status <= 200);
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardActionArea href={`/${type}-details/${data.alias}`}>
            <CardMedia
              className={classes.media}
              image={data.thumbnail}
              title={data.title}
            />
          </CardActionArea>
          <CardContent>
            <Typography component="h6" variant="subtitle2">
              {data.title}
            </Typography>
            <Typography component="p" variant="caption" color="textSecondary">
              {data.sinopse.substring(0, 128)+ '...'}
            </Typography>
          </CardContent>
          <IconButton
            className={auth ? '' : 'Mui-disabled'}
            disabled={auth ? false : true}
            style={{ position: 'absolute', float: 'right' }}
            onClick={() => updateLike(auth, data, type)}
          >
            <FavoriteIcon color={(auth && like) ? "error" : "inherit"} />
          </IconButton>
        </div>
      </Card>
    </Grid>
  )
}

export default Cartao;
