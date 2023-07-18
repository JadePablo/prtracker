"use client";
import React, { useEffect, useState } from 'react';
import PrFeed from '@components/PrFeed';
import { usePathname } from 'next/navigation';
import PrForm from '@components/Form';
import { useSession } from 'next-auth/react';
import { Container, Typography } from '@mui/material';

const GymHomePage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [domain, setDomain] = useState('');
  const [isGoodPath, setPath] = useState(true);
  const[isBadBoy,setBadBoy] = useState();
  useEffect(() => {
    const fetchGym = async () => {
      const response = await fetch(`api/getDomain/${pathname.slice(1).replace(/%20/g, ' ')}`);
      
      if (response.status !== 200) {
        setPath(false);
      } else {
        const data = await response.json();
        setDomain(data.domain);
      }
    };

    fetchGym();
  }, []);

  useEffect(() => {
    const checkBanStatus = async () => {
      if (session?.user) {
        const response = await fetch(`api/getBanStatus/${session.user.email}`);

        if (response.status === 200) {
          const isBanned = await response.json();
          // Perform actions based on the ban status
          setBadBoy(isBanned);
        }
      }
    };

    checkBanStatus();
  }, [session]);

  function hasDomain(email, domain) {
    const domainExists = email.includes(domain);
    return domainExists;
  }

  return (
    <Container>


      {!isGoodPath ? (
        <Typography>This gym does not exist in the database.</Typography>
      ) : (
        <>
          <Container
            sx={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: '1rem',
              padding: '1rem',
            }}
          >
            <Typography>{pathname.slice(1)}</Typography>
          </Container>
          {session?.user && hasDomain(session?.user.email, domain) && !isBadBoy ? (
            <PrForm />
          ) : (
            <Typography>
              You got to be unbanned and sign in with an email with '@{domain}'
            </Typography>
          )}

          <PrFeed />
        </>
      )}
    </Container>
  );
};

export default GymHomePage;
