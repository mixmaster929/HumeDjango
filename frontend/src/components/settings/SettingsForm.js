import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';

import APIKeySettings from './APIKeySettings';
  
export default function SettingsForm(){
  
    return (
        <Stack
          alignItems="center"
          justifyContent="center"
          minHeight="100vh" // Adjust as needed
        >
            <Card sx={{ width: '100%', maxWidth: 600 }}>
            <CardHeader
                subheader="Update Preferences"
                title="Settings"
            />
                <Divider />
                <CardContent>
                    <APIKeySettings />
                </CardContent>
            </Card>
        </Stack>
    );
  };