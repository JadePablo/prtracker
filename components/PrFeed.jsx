"use client";

import React, { useEffect, useState } from 'react';
import { Container, Grid, Select, MenuItem, Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import PrCard from './PrCard';

const PrFeed = () => {
  const [prs, setPrs] = useState([]);
  const [selectedLift, setSelectedLift] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const fetchPrs = async () => {
      const response = await fetch(`api/${pathname.slice(1).replace(/%20/g, ' ')}`);
      const data = await response.json();
      setPrs(data);
    };

    fetchPrs();
  }, []);

  const handleLiftChange = (event) => {
    setSelectedLift(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const filteredPrs = prs.filter((pr) => {
    if (selectedLift && pr.lift !== selectedLift) {
      return false;
    }
    return true;
  });

  const sortedPrs = filteredPrs.sort((a, b) => {
    if (selectedSort === 'ascDate') {
      return new Date(a.date) - new Date(b.date);
    }
    if (selectedSort === 'descDate') {
      return new Date(b.date) - new Date(a.date);
    }
    if (selectedSort === 'ascWeight') {
      return a.weight - b.weight;
    }
    if (selectedSort === 'descWeight') {
      return b.weight - a.weight;
    }
    return 0;
  });

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em', marginTop: '1em', marginBottom: '1em' }}>
        <Select
          value={selectedLift}
          onChange={handleLiftChange}
        >
          <MenuItem value="">All Lifts</MenuItem>
          <MenuItem value="bench">Bench</MenuItem>
          <MenuItem value="squat">Squat</MenuItem>
          <MenuItem value="deadlift">Deadlift</MenuItem>
        </Select>

        <Select
          value={selectedSort}
          onChange={handleSortChange}
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="ascDate">Date (Ascending)</MenuItem>
          <MenuItem value="descDate">Date (Descending)</MenuItem>
          <MenuItem value="ascWeight">Weight (Ascending)</MenuItem>
          <MenuItem value="descWeight">Weight (Descending)</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={2}>
        {sortedPrs.map((pr) => (
          <Grid item xs={12} sm={6} md={6} key={pr._id}>
            <PrCard
              lift={pr.lift}
              lifter={pr.lifter}
              weight={pr.weight}
              date={pr.date}
              source={pr.source}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PrFeed;
