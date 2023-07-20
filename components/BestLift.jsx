import { Container, Typography, Box } from '@mui/material';
import React from 'react';

const Bestlift = (props) => {
  const lift = props.lift;
  const weight = props.weight;
  const location = props.location;
  const date = props.date;
  const source = props.src;

  return (
    <Container sx={{ backgroundColor: 'black', padding: '1rem', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-start' }}>
        {lift} all-time PR
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem', alignSelf: 'flex-start' }}>
        {weight}
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem', alignSelf: 'flex-start' }}>
        {location}
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', fontSize: '1rem', alignSelf: 'flex-start' }}>
        {date}
      </Typography>
      <Box display="flex" justifyContent="flex-start" width="50%">
        <video width="100%" height="auto" controls>
          <source src={source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Container>
  );
};

export default Bestlift;
