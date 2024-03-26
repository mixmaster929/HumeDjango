import { BarChart as BarChartIcon } from '@mui/icons-material/';
import FaceIcon from '@mui/icons-material/Face';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  MenuItem,
  Select
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';

export default function EmbeddingPlot({ data }) {
  const [selectedFaceId, setSelectedFaceId] = useState(data ? 'face_0' : '');
  const [emotionLimit, setEmotionLimit] = useState(data ? '5' : '')
  const [filteredEmotions, setFilteredEmotions] = useState(null);

  useEffect(() => {
    if (data && data.length > 0){
      if (typeof(data) === "object"){
        const faceId = data[0].id
        setSelectedFaceId(faceId)
        setEmotionLimit('5')
        setFilteredEmotions(data.find(
          (item) => item.id === faceId
        )?.emotions)
      }
      else {
        setFilteredEmotions(data.emotions)
      }    
    }
    else if (data && data.length === 0) {
      setFilteredEmotions(null)
      setSelectedFaceId(null)
      setEmotionLimit(null)
    }
  }, [data]);

  const handleFaceIdChange = (event) => {
    setSelectedFaceId(event.target.value);
    const emotionsForSelectedFace = data.find(
      (item) => item.id === event.target.value
    )?.emotions;
    setFilteredEmotions(emotionsForSelectedFace);
  };

  const handleEmotionLimitChange = (event) => {
    setEmotionLimit(event.target.value)
  }
  
  return (
    <Card>
      <CardHeader title="Emotion Graph" />
      <Divider />
      {(data && filteredEmotions) ? (
        <div>
          <CardActions sx={{justifyContent: 'right'}}>
            <Select
              size='small'
              value={selectedFaceId}
              onChange={handleFaceIdChange}
              displayEmpty
            >
              {data.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
            <Select
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
          </CardActions>
          <CardMedia>
            <BarChart
              width={700}
              height={600}
              series={[
                {
                  data: filteredEmotions.slice(0, parseInt(emotionLimit)).map((emotion) => emotion.score),
                  id: 'emotionId',
                  yAxisKey: 'leftAxisId',
                },
              ]}
              xAxis={[
                { data: filteredEmotions.slice(0, parseInt(emotionLimit)).map((emotion) => emotion.name), scaleType: 'band', tickLabelInterval: () => true, 
                tickLabelStyle: {
                  angle: 45,
                  textAnchor: 'start',
                  fontSize: 10,
                },}]}
              yAxis={[{ id: 'leftAxisId' }]}
            />
          </CardMedia>
        </div>
      ) : (
        (data && data.length === 0 ? 
          <CardContent sx={{ height: 100, alignItems: 'center' }}>
            <Chip label="No Faces Detected" icon={<FaceIcon />} />
          </CardContent> :
        <CardContent sx={{ height: 100, alignItems: 'center' }}>
          <Chip label="Analyzing.." icon={<BarChartIcon />} />
        </CardContent>
        )
      )}
    </Card>
  );
}
