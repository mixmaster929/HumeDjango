import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import config from "../config";

  
export default function ProfileInfo(props){
    const profileInfo = props.profileInfo;
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleUpload = () => {
      if (!selectedFile) {
        alert('Please select a file before uploading.');
        return;
      }
  
      const formData = new FormData();
      formData.append('avatar', selectedFile);
  
      axios.patch(`${config.BACKEND_ENDPOINT}/users/${localStorage.getItem("user")}/`, formData,
      {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem("token"),
          'Content-Type': 'multipart/form-data',
        }
      }).then(response => {
        console.log('File uploaded successfully:', response.data);
        alert('File uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      });
  };
        
    return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={selectedFile ? URL.createObjectURL(selectedFile) : props.profileInfo.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            color="text.secondary"
            variant="body2"
          >
            @{profileInfo.username}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
          >
            {profileInfo.first_name} {profileInfo.last_name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{justifyContent: "center"}}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            component="span"
            size="small"
          >
            Upload
          </Button>
        </label>
        <Button
          variant="contained"
          size="small"
          onClick={handleUpload}
        >
          Update
        </Button>
      </CardActions>
    </Card>
    )
};