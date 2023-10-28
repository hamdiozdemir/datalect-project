import * as React from 'react';
import { NavLink } from 'react-router-dom/';
import { useSelector } from 'react-redux';

import { useState } from "react";
import { useTranslation } from "react-i18next";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import StorageIcon from '@mui/icons-material/Storage';

import Button from '@mui/material/Button';





function ResponsiveAppBar() {
  // Language Settings
  const { t, i18n: {changeLanguage, language} } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = (event) => {
    const selectedValue = event.currentTarget.getAttribute('value');
    setCurrentLanguage(selectedValue);
    changeLanguage(selectedValue);
    handleClose();
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = [
    {key:1, name: t('homepage'), url: '/'},
    {key:2, name: t('bulletins'), url: '/bulletins'},
    {key:3, name: t('keywords'), url: '/keywords'},
    // {key:4, name: 'New Project', url: '/create'},
    // {key:5, name: 'My Projects', url: '/projects'},
  ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const {isLoggedIn } = useSelector(state => state.globalVariables);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{m: 0}}>
        <Toolbar disableGutters sx={{ml: 0}}>
          <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            to="/"
            component={NavLink}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DataLect
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            {pages.map((page, index) => (
            <MenuItem 
              component={NavLink}
              to={page.url}
              key={index}
              >
                <Typography variant='appBarHeader' sx={{color: "#000" }}>
                  {page.name}
                </Typography>
            </MenuItem>

            ))}

            </Menu>
          </Box>

          <StorageIcon sx={{ display: { xs: 'none', sm:'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', sm:'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DataLect
          </Typography>
          {/* Menu Items Wide Screen */}

          {isLoggedIn && 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page, index) => (
            <MenuItem 
              component={NavLink}
              to={page.url}
              key={index}
              >
                <Typography variant='appBarHeader'>
                  {page.name}
                </Typography>
            </MenuItem>

            ))}
          </Box>}


          <Box sx= {{ display:'flex', ml: 'auto' }}>

            {!isLoggedIn && 
            <MenuItem 
                component={NavLink}
                to="/login"
                >
                <Typography variant='appBarHeader'>
                  {t('login')}
                </Typography>
            </MenuItem>}

            {!isLoggedIn && 
            <MenuItem 
                component={NavLink}
                to="/register"
                >
                <Typography variant='appBarHeader'>
                  {t('register')}
                </Typography>
            </MenuItem>}


            {/* // language selector  */}

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color='lightColor'
              
            >
              {/* <LanguageIcon></LanguageIcon> */}
              { currentLanguage }
            </Button>
            
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem value="en" onClick={handleChangeLanguage}>English</MenuItem>
              <MenuItem value="tr" onClick={handleChangeLanguage}>Türkçe</MenuItem>

            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>







  );
}
export default ResponsiveAppBar;