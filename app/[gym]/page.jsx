"use client";

import React from 'react';
import PrFeed from '@components/PrFeed';
import { usePathname } from 'next/navigation';
import PrForm from '@components/Form';
import { useSession } from 'next-auth/react';
import { Container, Typography } from '@mui/material';

const GymHomePage = () => {
  
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Container>
      <Container
        sx={{
          backgroundColor: 'black',
          color: 'white',
          marginTop: '1rem',
          padding: '1rem',
        }}
      >
        <Typography>
          {pathname.slice(1)}
        </Typography>
      </Container>

      {session?.user ? (
        <PrForm />
      ) : (
        <Typography>
          You must be logged in to submit a PR.
        </Typography>
      )}
      <PrFeed />
    </Container>
  );
};

export default GymHomePage;
