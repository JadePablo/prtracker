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
  Container
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

function PrForm() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    lifter: '',
    lift: '',
    weight: '',
    location: '',
    date: '',
    video: null
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
          onClick={(e) => {
            e.preventDefault();
            //handle upload
          }}
        >
          Submit PR
        </Button>
      </Box>
    </Container>
  );
}

export default PrForm;
