import { Card, CardContent, CardMedia, Link, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function APICard(props){
  const { difference, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://source.unsplash.com/random?wallpapers"
        title="green iguana"
      />
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Analyse {value}s
            </Typography>
            {value === "image" &&
            <Link href={`${value}/analysis`} underline="none" variant="h4" textTransform={"capitalize"}>
              {value} Analysis
            </Link>}
            {value === "video" &&  
            <Link href={`/analysis`} underline="none" variant="h4" textTransform={"capitalize"}>
              Real Time Analysis
            </Link>}
          </Stack>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Use our API to analyse {value}s and assess body language from it
              Use our API to analyse {value}s and assess body language from it
              Use our API to analyse {value}s and assess body language from it
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

APICard.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired
};