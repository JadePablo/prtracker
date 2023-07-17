"use client";
import {useState, useEffect} from 'react';
import {
    Container,Typography
} from '@mui/material';

const JudgingPanel = () => {
    const [prsToVerify, setPrsToVerify] = useState([]);

    useEffect(() => {
        const fetchPrs = async () => {
          const response = await fetch(`api/verify`);
          const data = await response.json();
          setPrsToVerify(data);
          console.log(prsToVerify)
        };
    
        fetchPrs();
      }, []);


      async function handleBan() {
        const response = await fetch('api/verify/ban', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: prsToVerify[0].lifterEmail,id: prsToVerify[0]._id }),
          });

          if (response.status === 200) {
            // Remove the first element in prsToVerify
            setPrsToVerify((prevPrs) => prevPrs.slice(1));
        }
      }

      async function handleGood() {
        const response = await fetch('api/verify', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: prsToVerify[0]._id, status: true }),
        });
        
        // handle response logic
        if (response.status === 200) {
            // Remove the first element in prsToVerify
            setPrsToVerify((prevPrs) => prevPrs.slice(1));
        }
      }
      

      async function handleBad() {
        const id = prsToVerify[0]._id;
      
        const response = await fetch(`api/verify/${id}`, {
          method: 'DELETE'});
          if (response.status === 200) {
            // Remove the first element in prsToVerify
            setPrsToVerify((prevPrs) => prevPrs.slice(1));
        }
        // handle response logic
      }
      
      

  return (
        <Container>
          <Typography>PRs to verify: {prsToVerify.length}</Typography>
        </Container>
  )
}

export default JudgingPanel