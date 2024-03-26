import {
    Box,
    CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// custom components
import SidebarNav from "../base/SidebarNav";
import ProfileSettings from './ProfileSettings';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const defaultTheme = createTheme();

export default function Profile(){
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        console.log(loggedInUser);
        if (!loggedInUser) {
          navigate('/signin');
        }
      });
      
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SidebarNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <ProfileSettings />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
