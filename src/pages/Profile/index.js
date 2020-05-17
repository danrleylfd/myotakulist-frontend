import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import Card from '../../components/Card';
import TabPanel from '../../components/TabPanel';
import api from '../../services/api';
import reauthenticate from '../../util/reauthenticate';

const useStyles = makeStyles(theme => ({
  appBarSpacer: { minHeight: 70 },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  customAvatar: {
    width: theme.spacing(16),
    height: theme.spacing(16)
  }
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Profile({match}) {
  // const auth = reauthenticate();
  const { discrim } = match.params;
  const classes = useStyles();
  const theme = useTheme();
  const [user,setUser] = useState(undefined);
  const [animes,setAnimes] = useState([]);
  const [mangas,setMangas] = useState([]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);
  const handleChangeIndex = index => setValue(index);

  useEffect(() => {
    async function loadUser(discrim) {
      const { data: user } = await api.get(`/auth/user/${discrim}`);
      setUser(user);
    }
    loadUser(discrim);
  }, [discrim]);

  useEffect(() => {
    async function loadAnimes(user) {
      if(!user) return;
      const { data } = await api.get(`/animes/bookmarks/${user._id}`);
      const { docs, ...pageInfo } = data;
      setAnimes([...animes, ...docs]);
    }
    loadAnimes(user);
  }, [user]);

  useEffect(() => {
    async function loadMangas(user) {
      if(!user) return;
      const { data } = await api.get(`/mangas/bookmarks/${user._id}`);
      const { docs, ...pageInfo } = data;
      setMangas([...mangas, ...docs]);
    }
    loadMangas(user);
  }, [user]);

  return (
    <Container className={classes.root}>
      <div className={classes.appBarSpacer} />
      {user ? (
        <>
          <Avatar className={classes.customAvatar} alt={user.name} src={user.avatar} color="white" />
          <Typography color="textPrimary" style={{ textAlign: 'center' }} component="h5" variant="h5">{user.name}</Typography>
          <Typography color="textPrimary" style={{ textAlign: 'center' }} component="p">{user.discrim}</Typography>
        </>
      ) : (<div></div>)}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Animes Favoritos" {...a11yProps(0)} />
        <Tab label="Mangás Favoritos" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        spacing={1}
        style={{ width: '100%', height: '100%' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {animes.length > 0 ? (
            <>
              <Grid container spacing={1}>
                { animes.map(anime => (
                  <Card key={anime._id} user={user} data={anime} type="animes" />
                ))}
              </Grid>
            </>
          ) : (<Typography color="textPrimary" style={{ textAlign: 'center' }} component="h6" variant="subtitle2">¯\_(ツ)_/¯</Typography>)}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {mangas.length > 0 ? (
          <>
            <Grid container spacing={1}>
              { mangas.map(manga => (
                <Card key={manga._id} user={user} data={manga} type="mangas" />
              ))}
            </Grid>
          </>
        ) : (<Typography color="textPrimary" style={{ textAlign: 'center' }} component="h6" variant="subtitle2">¯\_(ツ)_/¯</Typography>)}
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}

export default Profile;
