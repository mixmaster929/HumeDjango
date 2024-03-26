import FaceIcon from '@mui/icons-material/Face';
import { Button, Card, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, MenuItem, Select } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import EmbeddingPlot from '../analysis/EmbeddingPlot';
import config from '../config';


const VideoAnalysisComponent = () => {
  const [websocket, setWebsocket] = useState(null);
  const [predictedEmotions, setPredictedEmotions] = useState(null);
  const [selectedModel, setSelectedModel] = useState("face");
  const [emotionLimit, setEmotionLimit] = useState("5")
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  useEffect(() => {
    const ws = new WebSocket(config.HUME_STREAM_API_ENDPOINT);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPredictedEmotions(data)
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setWebsocket(null);
      setPredictedEmotions(null)
    };

    return () => {
      if (websocket) {
        stopVideo()
        websocket.close()
        setWebsocket(null)
      }
    };
  }, [selectedModel]); 
  
  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
      if (stream.getVideoTracks().length > 0) {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
  
        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        const sendFrameToWebSocket = async () => {
          try {
            const bitmap = await imageCapture.grabFrame();
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

            if (websocket && websocket.readyState === WebSocket.OPEN) {
              const frameBase64 = canvas.toDataURL('image/jpeg').split(',')[1];
              const requestData = JSON.stringify({
                data: frameBase64,
                models: {
                  face: {},
                },
              });
              websocket.send(requestData);
            }
            requestAnimationFrame(sendFrameToWebSocket);
          } catch (error) {
            console.error('Error grabbing frame:', error);
            if (websocket){
              websocket.close();
            }
            setWebsocket(null);
          }
        };
        sendFrameToWebSocket();
      } else {
        console.error('No active video tracks found in the media stream.');
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };  

  const stopVideo = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      
      setPredictedEmotions(null);
      websocket.close()
      setWebsocket(null);
    }
  };

  const handleEmotionLimitChange = (event) => {
    setEmotionLimit(event.target.value)
  }

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
          title="Video Stream"
        />
        <Divider/>
          <CardMedia>
            <video ref={videoRef} autoPlay playsInline />
          </CardMedia>
          <Button onClick={startVideo}>Start Video</Button>
          <Button onClick={stopVideo}>Stop Video</Button>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} rowSpacing={4}>
        <Card>
          <CardHeader title="Results" />
          <Divider />
          <CardContent>
            <Grid container>
              <Grid item xs={6} lg={6} md={6}>
                {predictedEmotions?.face?.predictions?.length ? 
                <Chip icon={<FaceIcon />} label={`Faces Detected: ${predictedEmotions?.face?.predictions?.length}`} />
                : <p>Detecting Face...</p>}
              </Grid>
              <Grid item xs={6} lg={6} md={6}>
                Emotion Count: <Select
                  size='small'
                  value={emotionLimit}
                  onChange={handleEmotionLimitChange}
                  displayEmpty
                >
                  {['5', '10', '20', '48'].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </CardContent>
        </Card>  
        {predictedEmotions && 
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 4 }}>
            <EmbeddingPlot data={predictedEmotions} selectedModel={selectedModel} emotionLimit={emotionLimit}/>
        </Grid> 
        }       
      </Grid>
    </Grid>
  );
};

export default VideoAnalysisComponent;
