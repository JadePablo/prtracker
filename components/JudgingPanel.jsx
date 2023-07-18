"use client";

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import PrCard from './PrCard';

const JudgingPanel = () => {
  const [prsToVerify, setPrsToVerify] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // Add videoKey state

  useEffect(() => {
    const fetchPrs = async () => {
      const response = await fetch(`api/verify`);
      const data = await response.json();
      setPrsToVerify(data);
    };

    fetchPrs();
  }, []);

  async function handleBan() {
    setLoading(true);
    const response = await fetch('api/verify/ban', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: prsToVerify[0].lifterEmail, id: prsToVerify[0]._id }),
    });

    if (response.status === 200) {
      // Remove the first element in prsToVerify
      setPrsToVerify((prevPrs) => prevPrs.slice(1));
      setVideoKey((prevKey) => prevKey + 1); // Update videoKey to force refresh
    }

    setLoading(false);
  }

  async function handleGood() {
    setLoading(true);
    const response = await fetch('api/verify', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: prsToVerify[0]._id, status: true }),
    });

    if (response.status === 200) {
      // Remove the first element in prsToVerify
      setPrsToVerify((prevPrs) => prevPrs.slice(1));
      setVideoKey((prevKey) => prevKey + 1); // Update videoKey to force refresh
    }

    setLoading(false);
  }

  async function handleBad() {
    setLoading(true);
    const id = prsToVerify[0]._id;

    const response = await fetch(`api/verify/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      // Remove the first element in prsToVerify
      setPrsToVerify((prevPrs) => prevPrs.slice(1));
      setVideoKey((prevKey) => prevKey + 1); // Update videoKey to force refresh
    }

    setLoading(false);
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography sx={{ color: 'white', backgroundColor: 'black', textAlign: 'center', marginTop: '1em' }}>
        PRs to verify: {prsToVerify.length}
      </Typography>
      {prsToVerify.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
            <Typography sx={{ marginBottom: '0.5em' }}>
              {prsToVerify[0].lift}
            </Typography>
            <Typography sx={{ marginBottom: '0.5em' }}>
              {prsToVerify[0].weight} lbs
            </Typography>
            <Typography sx={{ marginBottom: '0.5em' }}>
              @ {prsToVerify[0].location}
            </Typography>

            <video key={videoKey} width="320" height="240" controls>
              <source src={prsToVerify[0].source} type="video/mp4" />
            </video>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleGood}
              sx={{
                marginBottom: '1em',
                backgroundColor: '#333333',
                '&:hover': {
                  backgroundColor: '#D16002',
                },
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Good
            </Button>
            <Button
              variant="contained"
              onClick={handleBad}
              sx={{
                marginBottom: '1em',
                backgroundColor: '#333333',
                '&:hover': {
                  backgroundColor: '#D16002',
                },
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Bad
            </Button>
            <Button
              variant="contained"
              onClick={handleBan}
              sx={{
                marginBottom: '1em',
                backgroundColor: '#333333',
                '&:hover': {
                  backgroundColor: '#D16002',
                },
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                },
              }}
            >
              Ban
            </Button>
          </Box>
        </>
      ) : (
        <Typography sx={{ color: 'grey', fontSize: '2rem', textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
        No PRs to verify.
      </Typography>
      )}
    {loading && (
      <Box sx={{ marginTop: '2em' }}>
        <CircularProgress />
      </Box>
    )}
    </Container>
  );
};

export default JudgingPanel;
