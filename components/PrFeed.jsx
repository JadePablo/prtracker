"use client";

import React from 'react'
import { Container ,Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PrCard from './PrCard';

const PrFeed = () => {

    const [prs,setPrs] = useState([])
    
    const pathname = usePathname();

    useEffect(() => {
        const fetchPrs = async () => {
            const response = await fetch(`api/${pathname.slice(1)}`)
            // const data = await response.json();

            //temporary to test ui
            const data = [
                {
                    lifter: 'jade',
                    weight: '100',
                    date: '3',
                    _id: '1231231231'
                },
                {
                    lifter:'jade again',
                    weight: '200',
                    date: '4',
                    _id: '123123'
                }

            ];
            setPrs(data);
        };

        fetchPrs();
    },[])
  return (
    <Container>
        <Grid>
        {
          prs.map(pr => {
            return(
                <Grid fullWidth="true" item sx={{margin:"1em"}}key={pr._id} xs={12} sm={6} md={6}>
                    <PrCard lifter={pr.lifter} weight={pr.weight} date={pr.date} />
                </Grid>
            )
          })
        }
        </Grid>
    </Container>
  )
}

export default PrFeed