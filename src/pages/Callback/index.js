import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { createBrowserHistory } from "history";

import * as Discord from '../../util/discord';
import api from '../../services/api';

function Callback({location}) {
  const classes = useStyles();
  const [auth, setAuth] = useState({ access_token: 'nulo' });
  const signIn = async (auth) => {
    localStorage.setItem('token', auth.token);
    Object.keys(auth.user).map(key => localStorage.setItem(key, auth.user[key]));
    const withRefresh = createBrowserHistory({ forceRefresh: true });
    withRefresh.push({ pathname: '/profile' });
  }
  useEffect(() => {
    async function loadAuth(search) {
      const query = queryString.parse(search);
      const { data: authCallback } = await Discord.authCallback(query);
      const { data: me } = await Discord.getMe(authCallback);
      try {
        const { data } = await api.post('/auth/signup', { name: me.username, email: me.email });
        setAuth(data);
        await signIn(data);
      } catch (e) {
        const { data } = await api.put('/auth/signin_with_discord', { _id: me.id, email: me.email });
        setAuth(data);
        await signIn(data);
      }
    }
    loadAuth(location.search)
  }, [location]);
  return (
    <Container>
      <div className={classes.appBarSpacer} />
      {auth ? (
        <Typography color="textPrimary" style={{ textAlign: 'center' }} component="h5" variant="h5">Redirecionando...</Typography>
      ) : (<div></div>)}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  appBarSpacer: { minHeight: 70 }
}));

export default Callback;
