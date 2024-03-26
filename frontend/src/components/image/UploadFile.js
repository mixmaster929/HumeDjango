import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import config from "../config";
import EmbeddingPlot from './EmbeddingPlot';
import JobSummary from './JobSummary';

export default function UploadFile(){
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedFile, setPredictedFile] = useState(null);
  const [emotionsData, setEmotionsData] = useState();
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPredictedFile(null);
  };

  const handleUpload = () => {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user', localStorage.getItem("user"));
      
      axios.post(`${config.BACKEND_ENDPOINT}/media/`, formData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
          setPredictedFile(response.data.image)
          setEmotionsData(response.data.predictions.faces)
          setJobId(response.data.job_id)
        }).catch(error => {
          const errorMessage = error.response.data.error
          alert(errorMessage)
        }).finally(() => {
          setLoading(false);
        });
    };      
    
    return (
      <Grid
        sx={{ width: '50%' }}
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card>
            <CardHeader
              title="File Preview"
            />
            {(predictedFile || selectedFile) ? <CardMedia
                component="img"
                height={600}
                image={predictedFile ? `data:image/png;base64,${predictedFile}` : URL.createObjectURL(selectedFile)}
                sx={{objectFit: "contain"}}
            /> : <CardContent><Typography align='center'>No Image Selected</Typography></CardContent>}
            {loading && <LinearProgress />}         
            <Divider />
            <CardActions sx={{justifyContent: 'center'}}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  size="small"
                >
                  Choose File
                </Button>
              </label>
              <Button
                variant="contained"
                size="small"
                onClick={handleUpload}
              >
                Analyse
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <EmbeddingPlot data={emotionsData}/>
        </Grid> 
        {(emotionsData && jobId) && <Grid item xs={12} sm={12} md={12} lg={12}>
          <JobSummary details={{"jobId": jobId, "faces": emotionsData.length}}/>
        </Grid>}
    </Grid>
    );
  };