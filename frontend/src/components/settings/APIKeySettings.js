import {
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    Stack,
    TextField
} from '@mui/material';
import { useCallback } from 'react';
  
  export default function SettingsForm() {
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        // Add your form submission logic here
      },
      []
    );
  
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
        <Card variant="outlined" sx={{ p: 2 }}>
            <CardHeader title="API Settings" />
            <Divider />
            <Stack spacing={2}>
            <TextField
                fullWidth
                label="Hume API Key"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Zoom API Key"
                variant="outlined"
            />
            </Stack>
        </Card>
        <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
            <CardHeader title="User Settings" />
            <Divider />
            <Stack spacing={2}>
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Two-Factor Authentication Code"
                variant="outlined"
            />
            </Stack>
        </Card>
        </Stack>
        <Divider />
        <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant="contained" type="submit">
            Save
            </Button>
        </CardActions>
        </form>
      </div>
    );
  }
  