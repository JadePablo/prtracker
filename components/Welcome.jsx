import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Welcome = () => {
  const containerStyle = {
    backgroundColor: 'black',
    padding: '1rem',
    color: 'white',
    width: '100%',
    marginTop: '1rem', // Add margin at the top
  };

  const typographyStyle = {
    color: 'white',
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h6" component="div" gutterBottom style={typographyStyle}>
        ranked prs for squat, bench deadlift.
      </Typography>
      <Typography variant="body2" component="div" style={typographyStyle}>
        lifts are verified by select employees for each gym.
      </Typography>
    </Container>
  );
};

export default Welcome;