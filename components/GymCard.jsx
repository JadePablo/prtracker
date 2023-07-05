import React from "react";
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

/*
props breakdown:
name  = gym.gymName, location = gym.location
*/
function GymCard(props) {
  const name = props.gymName;
  const location = props.location;

  function capitalize(str) { //capitalize the gym names
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }

  const cardStyle = {
    backgroundColor: 'black',
    textDecoration: 'none',
    borderRadius: 0, // Remove border radius
  };

  const typographyStyle = {
    color: 'white',
  };

  return (
    <Link href={`/${name}`} passHref>
      <Card style={cardStyle}>
        <CardActionArea>
          <CardContent>
            <Typography variant="body1" style={typographyStyle}>
              {capitalize(name)}
            </Typography>
            <Typography variant="body2" style={typographyStyle}>
              @ {location}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default GymCard;
