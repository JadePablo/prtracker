"use client";

import { Container ,Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import GymCard from './GymCard';


const GymFeed = () => {
  const [gyms, setGyms] = useState([]);
  useEffect(() => {
    const fetchGyms = async () => {
      const response = await fetch(`api`);
      const data = await response.json();
      setGyms(data);
    };

    fetchGyms();
  }, []);
  return (
    <Container>
      <Grid>
        {
          gyms.map(gym => {
            return(
                <Grid fullWidth="true" item sx={{margin:"1em"}}key={gym._id} xs={12} sm={6} md={6}>
                    <GymCard gymName={gym.gymName} location={gym.location}/>
                </Grid>
            )
          })
        }
      </Grid>
    </Container>
  )
}

export default GymFeed