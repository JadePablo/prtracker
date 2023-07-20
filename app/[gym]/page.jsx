"use client";

import React, { useEffect, useState } from 'react';
import PrFeed from '@components/PrFeed';
import { usePathname } from 'next/navigation';
import PrForm from '@components/Form';
import { useSession } from 'next-auth/react';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';

const GymHomePage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [domain, setDomain] = useState('');
  const [isGoodPath, setPath] = useState(true);
  const [isBadBoy, setBadBoy] = useState();
  const [isLoading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchGym = async () => {
      setLoading(true); // Set loading state to true when fetching starts

      const response = await fetch(`api/getDomain/${pathname.slice(1).replace(/%20/g, ' ')}`);

      if (session?.user) {
        const response = await fetch(`api/getBanStatus/${session.user.email}`);

        if (response.status === 200) {
          const isBanned = await response.json();
          // Perform actions based on the ban status
          setBadBoy(isBanned);
        }
      }

      if (response.status !== 200) {
        setPath(false);
      } else {
        const data = await response.json();
        setDomain(data.domain);
      }

      setLoading(false); // Set loading state to false when fetching is done
    };

    fetchGym();
  }, [session]);

  function hasDomain(email, domain) {
    const domainExists = email.includes(domain);
    return domainExists;
  }

  return (
    <Container>
      {isLoading ? ( // Conditional rendering based on loading state
                <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '50vh' }} // Set a minimum height to center the CircularProgress
              >
                <CircularProgress color="inherit" />
              </Grid>
      ) : !isGoodPath ? (
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
            <Typography>
              {pathname
                .slice(1)
                .replace(/%20/g, ' ')
                .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())}
            </Typography>
          </Container>
          {session?.user && hasDomain(session?.user.email, domain) && !isBadBoy ? (
            <PrForm />
          ) : (
            <Container
            sx={{
              backgroundColor: 'black',
              color: 'white',
              marginTop: '1rem',
              padding: '1rem',
            }}
            >
              <Typography>
                You got to be unbanned and sign in with an email with '@{domain}' in order to post here.
              </Typography>
            </Container>

          )}

          <PrFeed />
        </>
      )}
    </Container>
  );
};

export default GymHomePage;
