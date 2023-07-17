"use client";

import React, {useEffect,useState} from 'react';
import PrFeed from '@components/PrFeed';
import { usePathname } from 'next/navigation';
import PrForm from '@components/Form';
import { useSession } from 'next-auth/react';
import { Container, Typography } from '@mui/material';

const GymHomePage = () => {
  
  const pathname = usePathname();
  const { data: session } = useSession();
  const [domain,setDomain] = useState("");

  useEffect(() => {
    const fetchGym = async () => {
        const response = await fetch(`api/getDomain/${pathname.slice(1)}`)
        const data = await response.json();
        setDomain(data.domain);
        
    };

    fetchGym();
},[])

function hasDomain(email, domain) {
  const domainExists = email.includes(domain);
  return domainExists;
}

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

      {(session?.user && hasDomain(session?.user.email, domain)) ? (
        <PrForm />
      ) : (
        <Typography>
          You must be logged in to submit a PR with an email that has '@{domain}' in it
        </Typography>
      )}

      <PrFeed />
    </Container>
  );
};

export default GymHomePage;
