import React from "react";
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

// Remember to add the 'overlay' effect when the user clicks on the PR, similar to viewing journals

const PrCard = (props) => {
  const lifter = props.lifter;
  const weight = props.weight;
  const date = props.date;

  return (
    <Card sx={{ backgroundColor: 'black', color: 'white', borderRadius: 0 }}>
      <CardActionArea>
        <CardContent>
          <Typography>
            {lifter}
          </Typography>
          <Typography>
            {weight} lbs
          </Typography>
          <Typography>
            on {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PrCard;
