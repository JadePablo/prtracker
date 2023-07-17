import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress
} from '@mui/material';

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
    <Container>
      <Typography>PRs to verify: {prsToVerify.length}</Typography>
      {prsToVerify.length > 0 ? (
        <>
          <Box mt={2} mb={2}>
            <video key={videoKey} width="320" height="240" controls>
              <source src={prsToVerify[0].source} type="video/mp4" />
            </video>
          </Box>
          <Box mt={2} mb={2}>
            <Button variant="contained" onClick={handleGood}>Good</Button>
            <Button variant="contained" onClick={handleBad}>Bad</Button>
            <Button variant="contained" onClick={handleBan}>Ban</Button>
          </Box>
        </>
      ) : (
        <Typography>No PRs to verify.</Typography>
      )}
      {loading && <CircularProgress />}
    </Container>
  );
};

export default JudgingPanel;
