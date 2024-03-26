import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import config from '../config';

const pages = {
  common: [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '#' },
    { label: 'Contact Us', path: '#' },
  ],
  authenticated: [
    { label: 'Dashboard', path: '/home' },
    { label: 'Sign Out', path: '#' },
  ],
  unauthenticated: [
    { label: 'Sign In', path: '/signin' },
  ]
}

export default function Navbar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    axios.post(`${config.BACKEND_ENDPOINT}/auth/logout/`, null, {
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          navigate("/signin");
        }
        else {
          console.log(res)
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("Error during logout")
      });
  }
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Hidden mdUp implementation="css">
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              flexGrow: 1,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Body Language Assessment Platform
          </Typography>

          <Hidden smDown implementation="css">
            {pages.common.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.path}
                sx={{ mx: 2, color: 'white' }}
              >
                {page.label}
              </Button>
            ))}
            {localStorage.getItem("token") ? pages.authenticated.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.path}
                sx={{ mx: 2, color: 'white' }}
                onClick={page.label === "Sign Out" ? handleSignOut : null}
              >
                {page.label}
              </Button>
            )) : pages.unauthenticated.map((page) => (
              <Button
                key={page.label}
                component={RouterLink}
                to={page.path}
                sx={{ mx: 2, color: 'white' }}
              >
                {page.label}
              </Button>
            ))} 
          </Hidden>

          <Hidden mdUp implementation="css">
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
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
              {pages.common.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.label}
                </MenuItem>
              ))}
              {localStorage.getItem("token") ? pages.authenticated.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.label}
                </MenuItem>
              )): pages.unauthenticated.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Menu>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
