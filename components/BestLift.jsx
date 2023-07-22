import { Container, Typography, Box } from '@mui/material';
import React from 'react';

const Bestlift = (props) => {
  const lift = props.lift;
  const weight = props.weight;
  const location = props.location;
  const date = props.date;
  const source = props.src;

  return (
    <Container sx={{ backgroundColor: 'black', padding: '1rem', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '16px' }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
          {lift} PR
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
          {weight}
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
          {location}
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem' }}>
          {new Date(date).toLocaleDateString()}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-start" alignItems="center" width="100%" height="100%">
        <video width="100%" height="200px" controls>
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Container>
  );
};

export default Bestlift;
