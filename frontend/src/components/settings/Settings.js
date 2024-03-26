import {
    Box,
    CssBaseline,
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

// custom components
import SidebarNav from "../base/SidebarNav";
import SettingsForm from './SettingsForm';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const defaultTheme = createTheme();

export default function Settings(){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SidebarNav />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    <SettingsForm  sx={{ mt: 0 }}/>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
