import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createBrowserHistory } from "history";
import React, { useState } from 'react';

import api from '../../services/api';
import reauthenticate from '../../util/reauthenticate';

export default function SignIn() {
  const classes = useStyles();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const signIn = async () => {
    const { data: auth } = await api.post('/auth/signin', { email, password });
    localStorage.setItem('token', auth.token);
    Object.keys(auth.user).map(key => localStorage.setItem(key, auth.user[key]));
    const withRefresh = createBrowserHistory({ forceRefresh: true });
    withRefresh.push({ pathname: '/profile' });
  }

  const auth = reauthenticate();
  if(auth) console.log(auth.name);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Entre</Typography>
        <div className={classes.form}>
          <TextField onChange={e => setEmail(e.target.value)} variant="outlined" margin="normal" required fullWidth label="Email" autoComplete="email" autoFocus />
          <TextField onChange={e => setPassword(e.target.value)} variant="outlined" margin="normal" required fullWidth label="Senha" type="password" autoComplete="current-password" />
          <Button onClick={() => signIn()} fullWidth variant="contained" color="primary" className={classes.submit}>Entrar</Button>
          <IconButton href="https://mol-backend.glitch.me/auth/discord" component="a" variant="body2">
            <AccountCircleIcon />
          </IconButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">Esqueceu a senha?</Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">Não tem uma conta? Registre-se</Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
