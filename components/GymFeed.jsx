"use client";

import { Container, Grid, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import GymCard from './GymCard';

const GymFeed = () => {
  const [gyms, setGyms] = useState([]);
  const [isLoading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchGyms = async () => {
      const response = await fetch(`api`);
      const data = await response.json();
      setGyms(data);
      setLoading(false); // Set loading state to false once data is fetched
    };

    fetchGyms();
  }, []);

  return (
    <Container>
      {isLoading ? ( // Conditional rendering based on loading state
                <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '50vh' }} // Set a minimum height to center the CircularProgress
              >
                <CircularProgress color="inherit" />
              </Grid>
      ) : (
        <Grid>
          {gyms.map((gym) => (
            <Grid sx={{margin:"1em"}} item xs={12} sm={6} md={6} key={gym._id}>
              <GymCard gymName={gym.gymName} location={gym.location} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GymFeed;
