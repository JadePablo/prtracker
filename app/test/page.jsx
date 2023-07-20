"use client";

import React from 'react';
import Bestlift from '@components/Bestlift';
import { Container } from '@mui/material';

const test = () => {


  const lift = "bench"; // Fill in the lift prop with the desired value
  const weight = "225 lbs"; // Fill in the weight prop with the desired value
  const location = "Gym Name"; // Fill in the location prop with the desired value
  const date = "July 20, 2023"; // Fill in the date prop with the desired value
  const vidSrc = "https://res.cloudinary.com/prtracker/video/upload/v1689597510/prs/eee3uop7svpmgmqyjzxa.mp4";

  return (
    <Container>
      <Bestlift lift={lift} weight={weight} location={location} date={date} src={vidSrc}/>
    </Container>
  );
};

export default test;
