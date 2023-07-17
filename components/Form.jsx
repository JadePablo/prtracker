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
import setLift from '../form_helpers/setLift.js';
import handleFileChange from '../form_helpers/handleFileChange';
import handleSubmit from '../form_helpers/handleSubmit';

function PrForm() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format

  const [showPrompt, setShowPrompt] = useState(false);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lifter: session.user.name, //get from session
    lift: '', //form
    weight: 0, //form
    location: pathname.slice(1), //get from pathname
    date: currentDate, //default to today
    source: '', //form
    verified: false //default to false
  });

  function handleSetLift(e) {
    setFormData(setLift(formData, e.target.value));
  }

  function handleFileChangeWrapper(e) {
    handleFileChange(setVideo, e);
  }

  async function handleSubmitWrapper(e) {
    e.preventDefault();
    await handleSubmit(formData, setShowPrompt, video, setLoading);
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
            onClick={(e) => handleSetLift(e)}
          />
          <FormControlLabel
            checked={formData.lift === 'bench'}
            className="radio"
            value="bench"
            control={<Radio sx={{ color: 'white' }} />}
            label="Bench"
            onClick={(e) => handleSetLift(e)}
          />
          <FormControlLabel
            checked={formData.lift === 'deadlift'}
            className="radio"
            value="deadlift"
            control={<Radio sx={{ color: 'white' }} />}
            label="Deadlift"
            onClick={(e) => handleSetLift(e)}
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

        {video != null ? (
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
              onChange={handleFileChangeWrapper}
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
              onChange={handleFileChangeWrapper}
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
        {loading ? (
          <CircularProgress sx={{ alignSelf: 'center', marginBottom: '1em' }} />
        ) : (
          <Button
            sx={{
              marginBottom: '1em',
              backgroundColor: '#333333',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            variant="contained"
            onClick={handleSubmitWrapper}
          >
            Submit PR
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default PrForm;
