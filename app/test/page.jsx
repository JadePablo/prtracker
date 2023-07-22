"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { usePathname } from 'next/navigation';

const ProfileVisit = (props) => {
  const pathname = usePathname();
  const [userPrs, setUserPrs] = useState([]);
  const [bestSquat, set_bestSquat] = useState();
  const [bestDeadlift, set_bestDeadlift] = useState();
  const [bestBench, set_bestBench] = useState();

  const [squatCount, set_squatCount] = useState();
  const [benchCount, set_benchCount] = useState();
  const [deadliftCount, set_deadliftCount] = useState();

  const [unbeatenPrs, set_unbeatenPrs] = useState();
  
  //64b53570ad2cba66d45ff53a
  useEffect(() => {
    const fetchPrs = async () => {
      const response = await fetch(`api/profileVisit/64b53570ad2cba66d45ff53a`);
      const data = await response.json();
    };

    fetchPrs();
  }, []);

  return (
    <Container>
      <Typography>testing</Typography>
    </Container>
  );
};

export default ProfileVisit;
