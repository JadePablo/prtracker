"use client";

import React from "react";
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';

const ProfilePrCard = (props) => {
  const lifter = props.lifter;
  const weight = props.weight;
  const date = new Date(props.date).toLocaleDateString(); // Convert date to local string format
  const source = props.source;
  const lift = props.lift;
  
  return (
    <Card sx={{ backgroundColor: 'black', color: 'white', borderRadius: 0 }}>
      <CardActionArea>
        <CardContent>
          <Box textAlign="center">
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', alignSelf: 'flex-start' }}>
              {lift}
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', alignSelf: 'flex-start' }}>
              {weight} lbs
            </Typography>
              <Typography>
                {lifter}
              </Typography>
            <Typography>
              on {date}
            </Typography>
            {source && (
              <Box display="flex" justifyContent="center">
                <video width="200px" height="200px" controls>
                  <source src={source} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProfilePrCard;
