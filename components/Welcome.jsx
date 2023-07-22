"use client";

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const Welcome = () => {
  const containerStyle = {
    backgroundColor: 'black',
    padding: '1rem',
    color: 'white',
    width: '100%',
    marginTop: '1rem', 
  };

  const typographyStyle = {
    color: 'white',
  };

  return (
    <Container sx={containerStyle}>
      <Typography variant="h2" sx={{ color: 'white', margin: '1rem 0' }}>ranked prs for squat, bench, deadlift.</Typography>

      <Typography variant="body2" component="div" style={typographyStyle}>
        lifts are verified before made public.
        <Link href="/faq">
        <Typography
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
            },
            '&:visited': {
              color: 'grey',
            },
          }}
        >
          click here for submission process & guidelines
        </Typography>      
      </Link>
      </Typography>


    </Container>
  );
};

export default Welcome;
