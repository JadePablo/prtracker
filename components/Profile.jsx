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
      const response = await fetch(`api/profile/${session.user.email}`);
      const data = await response.json();
      setUserPrs(data);
    };

    fetchPrs();
  }, []);

  return (
    <Container>
      {session?.user && (
        <Container>
          <Container sx={{ backgroundColor: 'black', marginTop: '2rem'}}>
            <Typography sx={{ color: 'white' }}>your prs.</Typography>
          </Container>
          {userPrs.map((pr) => (
            <Grid fullWidth="true" item sx={{ margin: '1em' }} key={pr._id} xs={12} sm={6} md={6}>
              <PrCard lifter={pr.lifter} weight={pr.weight} date={pr.date} />
            </Grid>
          ))}
        </Container>
      )}
    </Container>
  );
};

export default Profile;
