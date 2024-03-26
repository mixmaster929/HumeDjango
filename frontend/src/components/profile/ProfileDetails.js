import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import config from '../config';


export const AccountProfileDetails = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState("");
  const [errors, setErrors] = useState({})
 
  const handleSubmit = 
    (event) => {
      delete values.avatar
      event.preventDefault();
      axios.patch(`${config.BACKEND_ENDPOINT}/users/` + localStorage.getItem("user") + '/', values,
      {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem("token"),
        }
      })
        .then(response => {
          setErrors({});
          setOpenDialog(true);
        })
        .catch(error => {
          setErrors(error.response.data)
        });
    }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    setValues(props.profileInfo)
  }, [props.profileInfo])
  
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Edit your profile info"
          title={props.profileInfo.first_name + "'s Profile"} 
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="first_name"
                  onChange={(e) => {setValues({...values, first_name: e.target.value})}}
                  required
                  value={values.first_name}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.first_name}
                  helperText={errors.first_name && 
                    (errors.first_name.map((err, index) => (
                      <Typography variant="caption" key={index} color="error">
                        {err}
                      </Typography>
                    )))
                  }
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={(e) => {setValues({...values, last_name: e.target.value})}}
                  required
                  value={values.last_name}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.last_name}
                  helperText={errors.last_name && 
                    (errors.last_name.map((err, index) => (
                      <Typography variant="caption" key={index} color="error">
                        {err}
                      </Typography>
                    )))
                  }
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={(e) => {setValues({...values, username: e.target.value})}}
                  required
                  type="username"
                  value={values.username}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.username}
                  helperText={errors.username && 
                    (errors.username.map((err, index) => (
                      <Typography variant="caption" key={index} color="error">
                        {err}
                      </Typography>
                    )))
                  }
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={(e) => {setValues({...values, email: e.target.value})}}
                  required
                  value={values.email}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.email}
                  helperText={errors.email && 
                    (errors.email.map((err, index) => (
                      <Typography variant="caption" key={index} color="error">
                        {err}
                      </Typography>
                    )))
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Update
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Profile Updated</DialogTitle>
        <DialogContent>
          <DialogContentText>Your profile has been successfully updated!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};