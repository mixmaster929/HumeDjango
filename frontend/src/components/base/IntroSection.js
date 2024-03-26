import { Container, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';


export default function IntroSection(props) {
  const { post } = props;

  return (
      <Container disableGutters component="main"
       sx={{ pt: 8, pb: 6, backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', 
            minHeight: '100vh', 
            minWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              width: '90%', 
              maxWidth: 600, 
              margin: 'auto',
              padding: '4%',
            }}
            >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
            >
              {post.title}
            </Typography>
            <Typography variant="h5" align="center" component="p">
              {post.description}
            </Typography>
          </Paper>
      </Container>
  );
}

IntroSection.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

