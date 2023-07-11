import React from "react";
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

// Remember to add the 'overlay' effect when the user clicks on the PR, similar to viewing journals

const PrCard = (props) => {
  const lifter = props.lifter;
  const weight = props.weight;
  const date = props.date;
  const source = props.source;
  const lift = props.lift;
  return (
    <Card sx={{ backgroundColor: 'black', color: 'white', borderRadius: 0 }}>
      <CardActionArea>
        <CardContent>
          <Typography>
            {lifter}
          </Typography>
          <Typography>
            {lift}
          </Typography>
          <Typography>
            {weight} lbs
          </Typography>
          <Typography>
            on {date}
          </Typography>
          {source && (
            <video width="200px" height="200px" controls>
              <source src={source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PrCard;
