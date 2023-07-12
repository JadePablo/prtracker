"use client";

import { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Container,
  Grid,
  CircularProgress
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function PrForm() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format

  const [showPrompt, setShowPrompt] = useState(false);
  const [video,setVideo] = useState(null);
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lifter: session.user.email, //get from session
    lift: '', //form
    weight: 0, //form
    location: pathname.slice(1), //get from pathname
    date: currentDate, //default to today
    source: '', //form
    verified: false //default to false
  });

  function setLift(e) {
    switch (e.target.value) {
      case 'squat':
        setFormData({ ...formData, lift: e.target.value });
        break;
      case 'deadlift':
        setFormData({ ...formData, lift: e.target.value });
        break;
      case 'bench':
        setFormData({ ...formData, lift: e.target.value });
        break;
      default:
        setFormData({ ...formData, lift: '' });
    }
  }

  function handleFileChange(e) {

    const file = e.target.files[0];
    setVideo(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.lift || formData.weight <= 0 || formData.weight >= 1500 || video === null) {
      setShowPrompt(true);
      return
    }

    //upload video to cloudinary here
    const url = await submitVideo(video);
    const updatedFormData = { ...formData, source: url };
    const response = await fetch('api/upload',{
      method:"POST",
      body: JSON.stringify(updatedFormData)
    })
    console.log(response);
    // handle upload or further processing
  }

  async function submitVideo(file) {
    console.log('submitting video...');
    const videoData = new FormData();
    videoData.append('file',file);
    videoData.append('upload_preset','prs_preset');
    const response = await fetch('https://api.cloudinary.com/v1_1/prtracker/video/upload', {
      method: 'POST',
      body: videoData
    }).then(r => r.json());
    
    return response.url;
  }

  return (
    <Container sx={{ backgroundColor: 'black', color: 'white', marginTop: '1rem', padding: '1rem' }}>
      <Typography sx={{ padding: '0.5em' }} variant="h4">
        Submit a Pr
      </Typography>

      <Box component="form" autoComplete="off" display="flex" flexDirection="column">
        <RadioGroup required row sx={{ marginBottom: '0.5em' }}>
          <FormControlLabel
            checked={formData.lift === 'squat'}
            className="radio"
            value="squat"
            control={<Radio sx={{ color: 'white' }} />}
            label="Squat"
            onClick={(e) => setLift(e)}
          />
          <FormControlLabel
            checked={formData.lift === 'bench'}
            className="radio"
            value="bench"
            control={<Radio sx={{ color: 'white' }} />}
            label="Bench"
            onClick={(e) => setLift(e)}
          />
          <FormControlLabel
            checked={formData.lift === 'deadlift'}
            className="radio"
            value="deadlift"
            control={<Radio sx={{ color: 'white' }} />}
            label="Deadlift"
            onClick={(e) => setLift(e)}
          />
        </RadioGroup>
        {formData.lift === '' && (
          <Typography paddingLeft="1em" marginBottom="1em" align="left" fontSize="12px" color="white">
            Must choose one lift
          </Typography>
        )}
        <TextField
          sx={{ marginBottom: '1em' }}
          InputLabelProps={{ style: { color: 'white' } }}
          inputProps={{ style: { color: 'white', borderColor: 'white' } }}
          label="Weight (lbs)"
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />

        <Container sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
          {video !== null && (
            <video width="225px" height="400px" controls src={URL.createObjectURL(video)} />
          )}
        </Container>

          {video != null  ? (
            <Button 
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
            variant="contained" component="label">
              Replace video of PR
              <input
                hidden
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
              />
            </Button>
          ) : (
            <Button
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
              variant="contained"
              component="label"
            >
              Upload Video of your PR
              <input
                hidden
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
              />
            </Button>
          )}

          {showPrompt && (
            <Grid item xs={12}>
              <Typography variant="body1" color="white">
                title. content. date. make sure they aren't empty. then submit.
              </Typography>
            </Grid>
          )}
        <Button
          sx={{
            marginBottom: '1em',
            backgroundColor: '#333333',
            color: 'white',
            '&:hover': {
              backgroundColor: 'white',
              color: 'black'
            }
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit PR
        </Button>
      </Box>
    </Container>
  );
}

export default PrForm;
