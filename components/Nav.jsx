"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ color: 'white' }}>
        <Link href="/">
          <Button color="inherit">
            <Typography variant="h6" component="p" style={{ color: 'white', textTransform: 'lowercase' }}>
              PRTRACKER
            </Typography>
          </Button>
        </Link>

        {session?.user ? (
          <Box ml="auto" display="flex" alignItems="center">
            <Button color="inherit" onClick={signOut}>
              <Typography variant="body1" component="p" style={{ textTransform: 'lowercase' }}>
                sign out
              </Typography>
            </Button>
            <Link href="/profile">
              <Avatar
                src={session?.user.image}
                alt="user avatar"
                sx={{ width: 37, height: 37, marginRight: '0.5rem' }}
              />
            </Link>
          </Box>
        ) : (
          <Box ml="auto">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  color="inherit"
                  onClick={() => signIn(provider.id)}
                >
                  <Typography variant="body1" component="p" style={{ textTransform: 'lowercase' }}>
                    sign in
                  </Typography>
                </Button>
              ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
