import { BarChart as BarChartIcon } from '@mui/icons-material/';
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

export default function EmbeddingPlot({ data, selectedModel, emotionLimit }) {
  const [selectedFaceId, setSelectedFaceId] = useState(data ? 'face_0' : '');
  const [filteredEmotions, setFilteredEmotions] = useState(null);
  
  useEffect(() => {
      if (data.face && data.face.predictions){
        const faceId = data.face.predictions[0]["face_id"]
        const emotions = data.face.predictions.find(
          (item) => item.face_id === faceId
        )?.emotions
        if (emotions){
          const sortedEmotions = emotions.slice().sort((a, b) => b.score - a.score);
          setSelectedFaceId(faceId)
          setFilteredEmotions(sortedEmotions)
        }
      }
      else {
        const predictions = data[selectedModel]?.predictions
        if (predictions){
          const emotions = predictions[0].emotions
          const sortedEmotions = emotions.slice().sort((a, b) => b.score - a.score);
          setFilteredEmotions(sortedEmotions)
        }
      }    
  }, [data]);

  const handleFaceIdChange = (event) => {
    setSelectedFaceId(event.target.value);
    const emotionsForSelectedFace = data.find(
      (item) => item.face_id === event.target.value
    )?.emotions;
    setFilteredEmotions(emotionsForSelectedFace);
  };

  return (
    <Card>
      <CardHeader title="Emotion Graph" />
      <Divider />
      {(data && filteredEmotions && filteredEmotions.length > 0) ? (
        <div>
          {data.face && <CardActions sx={{justifyContent: 'right'}}>
            <Select
              size='small'
              value={selectedFaceId}
              onChange={handleFaceIdChange}
              displayEmpty
            >
              {data.face && data.face.predictions?.map((item) => (
                <MenuItem key={item.face_id} value={item.face_id}>
                  {item.face_id}
                </MenuItem>
              ))}
            </Select>
          </CardActions>}
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
        <CardContent sx={{ height: 100, alignItems: 'center' }}>
          <Chip label="Analyzing.." icon={<BarChartIcon />} />
        </CardContent>
      )}
    </Card>
  );
}
