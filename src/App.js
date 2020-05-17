import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import Header from './components/Header';
import Routes from './routes';

import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: purple,
    secondary: green,
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
