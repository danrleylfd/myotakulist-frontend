import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import { createBrowserHistory } from "history";
import React, { useState } from 'react';

import reauthenticate from '../../util/reauthenticate';

const useStyles = makeStyles(theme => ({
  grow: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    minWidth: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      minWidth: 287,
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconDistance: { marginRight: theme.spacing(1) }
}));

function Header() {
  const classes = useStyles();
  const [searchTerm,setSearchTerm] = useState('');
  const handleChange = event => setSearchTerm(event.target.value);
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      const withRefresh = createBrowserHistory({ forceRefresh: true });
      withRefresh.push({ pathname: `/search/${searchTerm}` });
    }
  }
  const auth = reauthenticate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => { setAnchorEl(null); handleMobileMenuClose(); }
  const handleMobileMenuOpen = event => setMobileMoreAnchorEl(event.currentTarget);
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component="a" href="/profile" onClick={handleMenuClose}>Perfil</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); localStorage.clear(); }}>Sair</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component="a" href="/animes">
        <IconButton color="inherit">
          <MovieIcon />
        </IconButton>
        <p>Animes</p>
      </MenuItem>
      <MenuItem component="a" href="/mangas">
        <IconButton color="inherit">
          <BookIcon fontSize="small" />
        </IconButton>
        <p>Mangás</p>
      </MenuItem>
      {auth ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar className={classes.avatar} alt={auth.name} src={auth.avatar} color="white" />
          </IconButton>
          <p>{auth.name}</p>
        </MenuItem>
      ) : (
        <MenuItem component="a" href="/signin">
          <IconButton>
            <PersonIcon fontSize="small" />
          </IconButton>
          <p>Entrar</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton color="inherit" component="a" href="/" className={classes.menuButton}>
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>My Otaku List</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}><SearchIcon /></div>
            <InputBase
              placeholder="Pesquise animes e mangás..."
              classes={{ root: classes.inputRoot, input: classes.inputInput, }}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              inputProps={{ 'aria-label': 'title' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" component="a" href="/animes" className={classes.iconDistance}>
              <MovieIcon />
            </IconButton>
            <IconButton color="inherit" component="a" href="/mangas" className={classes.iconDistance}>
              <BookIcon />
            </IconButton>
            {auth ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                size="small"
              >
                <Avatar className={classes.avatar} alt={auth.name} src={auth.avatar} color="white" />
              </IconButton>
            ) : (
              <IconButton component="a" href="/signin">
                <PersonIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Header;
