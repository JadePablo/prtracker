"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Container, Typography } from '@mui/material';

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
          <Typography variant="h6" component="h2">
            User: {session.user.name}
          </Typography>
          <Typography variant="body1" component="p">
            Email: {session.user.email}
          </Typography>
        </Container>
      )}

      <Container>
        <Typography>Use the user's email to display their PRs</Typography>
        {userPrs.map((pr) => (
          <Typography key={pr._id} variant="body1" component="p">
            {pr.lift} - {pr.weight} - {pr.location}
          </Typography>
        ))}
      </Container>
    </Container>
  );
};

export default Profile;
