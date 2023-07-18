import React from "react";
import { Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';

const PrCard = (props) => {
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

export default PrCard;
