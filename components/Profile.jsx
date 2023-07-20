"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Typography, Grid } from '@mui/material';
import PrCard from './PrCard';

const Profile = () => {
  const { data: session } = useSession();
  const [userPrs, setUserPrs] = useState([]);

  useEffect(() => {
    const fetchPrs = async () => {
      const response = await fetch(`api/profile/${session?.user.email}`);

      const data = await response.json();
      setUserPrs(data);
      console.log(userPrs);
    };

    fetchPrs();
  }, []);

  return (
    <Container>
      {session?.user && (
        <Container>
          <Container sx={{ backgroundColor: 'black', marginTop: '2rem', padding: '1rem'}}>
            <Typography sx={{ color: 'white', margin: '1rem 0' }}>your prs.</Typography>
          </Container>
          {userPrs.length === 0 ? (
            <Typography sx={{ color: 'grey', fontSize: '2rem', textAlign: 'center', margin: '2rem' }}>
              No recorded PRs
            </Typography>
          ) : (
            <Grid container spacing={2} sx={{marginTop:'1em'}}>
              {userPrs.map((pr) => (
                <Grid item xs={12} sm={6} md={6} key={pr._id}>
                  <PrCard lift={pr.lift} lifter={pr.lifter} weight={pr.weight} date={pr.date} source={pr.source}/>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </Container>
  );
};

export default Profile;
