import React, { useState, useEffect, useMemo, memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from './AppLayout';
import { logOut } from '../../Services/apiUser';

const pages = ['home', 'tours'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ pathname, isScrolled}) {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const {userData, setUserData} =  useUserContext()
  const handleLogOut = () => {
    logOut()
    setUser(null)
  }

  return (
    <AppBar
      sx={{
        backgroundColor: pathname === '/' ? (isScrolled ? '#22c55e' : 'transparent') : '#22c55e',
        transition: 'background-color 0.3s ease',
        boxShadow: isScrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        zIndex:999999
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link textAlign="center " to={`/${page}`}>{page.toUpperCase()}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           {/* -------------------------------------Right side----------------------------------- */}
              <Link  to='/' className='font-semibold mx-2'><p className='text-white text-4xl font-dancing tracking-wide font-light'>Natours</p></Link>
              {userData.role === 'admin' && <Link  to='/controlPanel' className='font-semibold mx-2'>Control Panel</Link>}
              <Link  to='/tours' className='font-semibold mx-2  flex items-center pt-2 text-sm underline-from-right'>AVAILABLE TOURS</Link>
              
              
           
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userData.name} src={userData.photo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           

              <MenuItem  onClick={handleCloseUserMenu}>
                <Link to='/profile/info' className='text-sm p- '> PROFILE <i class="fa-solid fa-user ms-2"></i></Link>
              </MenuItem>
              <MenuItem  onClick={handleCloseUserMenu}>
                <Link to='/login' className='text-sm ' onClick={handleLogOut}> LOG OUT <i class="fa-solid fa-right-from-bracket ms-2"></i> </Link>
              </MenuItem>
           
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default memo(ResponsiveAppBar);
