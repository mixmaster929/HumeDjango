import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';
import { AccountProfileDetails } from './ProfileDetails';
import ProfileInfo from './ProfileInfo';

export default function ProfileSettings(){

    const [profileInfo, setProfileInfo] = useState({})

    useEffect(() => {
        axios.get(
        `${config.BACKEND_ENDPOINT}/users/` + localStorage.getItem("user"),
        {
          headers: {
            'Authorization': 'Token ' + localStorage.getItem("token"),
          }
        }).then(response => {
          setProfileInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          alert('Error fetching user details:', error)
        });
      }, []); 
    
    return(
    <>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
        >
        <Container maxWidth="lg">
            <Stack spacing={3}>
            <div>
                <Typography variant="h4">
                Account
                </Typography>
            </div>
            <div>
                <Grid
                container
                spacing={3}
                >
                <Grid
                    xs={12}
                    md={6}
                    lg={4}
                >
                    <ProfileInfo profileInfo={profileInfo}/>
                </Grid>
                <Grid
                    xs={12}
                    md={6}
                    lg={8}
                >
                    <AccountProfileDetails profileInfo={profileInfo}/>
                </Grid>
                </Grid>
            </div>
            </Stack>
        </Container>
        </Box>
    </>
    );
};