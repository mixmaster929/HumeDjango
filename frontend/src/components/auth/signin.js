import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Copyright from '../base/Copyright';
import Navbar from '../base/Navbar';
import config from '../config';


const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const [error, setError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(
      `${config.BACKEND_ENDPOINT}/auth/login/`, 
      {
        username: data.get('username'),
        password: data.get('password')
      }
    ).then((res) => {
        navigate('/home');
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("user", res.data.user)
    }).catch((error) =>{
      const errors = error.response.data
      setError(errors)
    });
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      navigate('/home');
    }
  });
  
  return (
    <ThemeProvider theme={defaultTheme}>
        <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              error={!!error.username}
              helperText={
              error.username && (
                error.username.map((err, index) => (
                  <Typography key={index} color="error" sx={{ mt: 1 }}>
                    {err}
                  </Typography>
                ))
              )}
              autoFocus
            />
              
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!error.password}
              helperText={
              error.password && (
                error.password.map((err) => (
                  <Typography fullWidth color="error">
                    {err}
                  </Typography>
                ))
              )}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}