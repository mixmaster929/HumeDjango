import FaceIcon from "@mui/icons-material/Face";
import { Button, Card, CardContent, CardHeader, CardMedia, Chip, Divider, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import EmbeddingPlot from "../analysis/EmbeddingPlot";
import config from "../config";


const AudioAnalysisComponent = ( {selectedModel} ) => {
  const [websocket, setWebsocket] = useState(null);
  const [predictedEmotions, setPredictedEmotions] = useState(null);
  const [emotionLimit, setEmotionLimit] = useState("5")
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  
  useEffect(() => {
    const ws = new WebSocket(config.HUME_STREAM_API_ENDPOINT);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      console.log(event.data)
      const data = JSON.parse(event.data);
      setPredictedEmotions(data)
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setWebsocket(null);
      setPredictedEmotions(null)
    };

    return () => {
      if (websocket) {
        websocket.close()
        setWebsocket(null)
      }
    };
  }, []); 
  
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result
          resolve(result.split(",")[1]);
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (stream.getAudioTracks().length > 0) {
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder
      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        chunks = [];
        if (websocket && websocket.readyState === WebSocket.OPEN) {
          const blobBase64 = await blobToBase64(blob)
          const requestData = JSON.stringify({
            data: blobBase64,
            models: {
              [selectedModel]: {},
            },
            stream_window_ms: 5000,
          });
          websocket.send(requestData);
        }
      };
      mediaRecorder.start();
      setInterval(() => {
        mediaRecorder.stop();
        mediaRecorder.start();
      }, 5000);
      } else {
        console.error("No active video tracks found in the media stream.");
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
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
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  const handleEmotionLimitChange = (event) => {
    setEmotionLimit(event.target.value)
  }

  return (
    <Grid
      sx={{ width: "50%" }}
      container
      rowSpacing={4}
      columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}
    >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card>
        <CardHeader
          title="Video Stream"
        />
        <Divider />
          <CardMedia>
            <video ref={videoRef} autoPlay playsInline/>
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
                : <p>Detecting Audio...</p>}
              </Grid>
              <Grid item xs={6} lg={6} md={6}>
                Emotion Count: <Select
                  size="small"
                  value={emotionLimit}
                  onChange={handleEmotionLimitChange}
                  displayEmpty
                >
                  {["5", "10", "20", "48"].map((n) => (
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

export default AudioAnalysisComponent;
