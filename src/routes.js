import React from 'react';
import { BrowserRouter, Route }  from 'react-router-dom';

import Anime from './pages/Anime';
import Animes from './pages/Animes';
import Callback from './pages/Callback';
import Home from './pages/Home';
import Manga from './pages/Manga';
import Mangas from './pages/Mangas';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path='/'                 component={Home} />
      <Route exact path='/signup'           component={SignUp} />
      <Route exact path='/signin'           component={SignIn} />
      <Route exact path='/discord/callback' component={Callback} />
      <Route exact path='/profile'      component={MyProfile} />
      <Route exact path='/profile/:discrim' component={Profile} />
      <Route exact path='/mangas'           component={Mangas} />
      <Route exact path='/animes'           component={Animes} />

      <Route path='/search/:title' component={Search} />
      <Route path='/mangas-by-genres/:genres' component={Mangas} />
      <Route path='/mangas-details/:id' component={Manga} />
      <Route path='/animes-by-genres/:genres' component={Animes} />
      {/* <Route path='/animes-details/:id' component={Anime} /> */}
      <Route path='/animes-details/:title' component={Anime} />
    </BrowserRouter>
  );
}

export default Routes;
