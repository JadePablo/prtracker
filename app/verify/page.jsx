"use client";
import { useSession } from 'next-auth/react';
import { Container } from '@mui/material';
import Forbidden from '@components/Forbidden';
import JudgingPanel from '@components/JudgingPanel';


const JudgingDashboard = () => {
  const { data: session } = useSession();


  return (
    <Container>
      {session?.user?.email === process.env.NEXT_PUBLIC_JUDGECRED ? (
        <JudgingPanel />
      ) : (
        <Forbidden />
      )}
    </Container>
  );
}

export default JudgingDashboard;
