"use client";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Forbidden from '@components/Forbidden';
import JudgingPanel from '@components/JudgingPanel';

const JudgingDashboard = () => {
  const { data: session } = useSession();

  return (
    <Container>
      {session?.user?.email === 'jadepablo97@gmail.com' ? (
        <JudgingPanel />
      ) : (
        <Forbidden />
      )}
    </Container>
  );
}

export default JudgingDashboard;
