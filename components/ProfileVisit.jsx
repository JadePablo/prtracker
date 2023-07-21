"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { usePathname } from 'next/navigation';

import FixedSizeScrollableList from './FixedSizeScrollableList';
import Bestlift from './BestLift';
import PrCard from './PrCard';
import ProfilePrCard from './ProfilePrCard';

const ProfileVisit = () => {
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf('/');
  const id = pathname.substring(lastSlashIndex + 1);
  const [userPrs, setUserPrs] = useState([]);
  const [bestSquat, set_bestSquat] = useState();
  const [bestDeadlift, set_bestDeadlift] = useState();
  const [bestBench, set_bestBench] = useState();

  const [squatCount, set_squatCount] = useState();
  const [benchCount, set_benchCount] = useState();
  const [deadliftCount, set_deadliftCount] = useState();

  const [unbeatenPrs, set_unbeatenPrs] = useState();
  const [profileNotFound, setProfileNotFound] = useState(false);

  useEffect(() => {
    const fetchPrs = async () => {
        try {
            const response = await fetch(`/api/profileVisit/${id}`);
            if (!response.ok) {
            setProfileNotFound(true);
            return;
            }
            const data = await response.json();
            setUserPrs(data.user_prs);
            set_bestSquat(data.bestLifts.squat);
            set_bestBench(data.bestLifts.bench);
            set_bestDeadlift(data.bestLifts.deadlift);
            set_squatCount(data.prCount.squat);
            set_benchCount(data.prCount.bench);
            set_deadliftCount(data.prCount.deadlift);
            set_unbeatenPrs(data.unbeatenPrs);
        } catch (error) {
            console.log(error);
        }

    };

    fetchPrs();
  }, []);
  return (
<Container>
      { profileNotFound ? (
        <Typography sx={{ fontSize: '2rem', color: 'grey', textAlign: 'center', margin: '2rem' }}>
          This profile doesn't exist
        </Typography>
      ): (
        <Container>
          <Container sx={{ backgroundColor: 'black', marginTop: '2rem', padding: '1rem'}}>
            <Typography variant="h2" sx={{ color: 'white', margin: '1rem 0' }}>their stats.</Typography>
          </Container>
          {userPrs.length === 0 ? (
            <Typography sx={{ color: 'grey', fontSize: '2rem', textAlign: 'center', margin: '2rem' }}>
              No recorded PRs
            </Typography>
          ) : (
            <Container>
              <Container
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                <Typography variant="h4"># of verified PRs</Typography>
                <Typography variant="h6">
                  <span style={{ fontWeight: 'bold' }}>squat:</span> {squatCount} |{' '}
                  <span style={{ fontWeight: 'bold' }}>bench:</span> {benchCount} |{' '}
                  <span style={{ fontWeight: 'bold' }}>deadlift:</span> {deadliftCount}
                </Typography>
              </Container>

              {unbeatenPrs && <FixedSizeScrollableList unbeatenPrs={unbeatenPrs} />}

              <Grid container spacing={2}>
                {bestSquat && (
                  <Grid item xs={12} sm={4}>
                    <Bestlift
                      lift={bestSquat.lift}
                      weight={bestSquat.weight}
                      location={bestSquat.location}
                      date={bestSquat.date}
                      src={bestSquat.source}
                    />
                  </Grid>
                )}
                {bestBench && (
                  <Grid item xs={12} sm={4}>
                    <Bestlift
                      lift={bestBench.lift}
                      weight={bestBench.weight}
                      location={bestBench.location}
                      date={bestBench.date}
                      src={bestBench.source}
                    />
                  </Grid>
                )}
                {bestDeadlift && (
                  <Grid item xs={12} sm={4}>
                    <Bestlift
                      lift={bestDeadlift.lift}
                      weight={bestDeadlift.weight}
                      location={bestDeadlift.location}
                      date={bestDeadlift.date}
                      src={bestDeadlift.source}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: '1em' }}>
                {userPrs.map((pr) => (
                  <Grid item xs={12} sm={6} md={6} key={pr._id}>
                    <ProfilePrCard lift={pr.lift} lifter={pr.lifter} weight={pr.weight} date={pr.date} source={pr.source} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
};

export default ProfileVisit;
