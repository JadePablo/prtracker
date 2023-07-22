import React from 'react'
import { Container, Typography } from '@mui/material';

const Faq = () => {
  return (
    <Container>
      <Container sx={{ backgroundColor: 'black', marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h2" sx={{ color: 'white', margin: '1rem 0' }}>submission process</Typography>
        <Typography sx={{ color: 'white' }}>
          submit your lift with the form. <br />
          judges are notified via email to verify your lift.
          They decide to verify or reject the lift. <br />
          you are notified of their decision via email. <br />
          <strong>if you beat someone's verified lift that hasn't been beaten before, that person is notified.</strong> <br />
          the same applies to your verified lifts. <br />
          <strong>only verified lifts are shown.</strong>
        </Typography>
      </Container>
      <Container sx={{ backgroundColor: 'black', marginTop: '2rem', padding: '1rem' }}>
        <Typography variant="h2" sx={{ color: 'white', margin: '1rem 0' }}>submission guidelines</Typography>
        <Typography sx={{ color: 'white' }}>
          a lift can be rejected for the following reasons:<br />
          <ul>
            <li>depth isn't reached</li>
            <li>you pulled sumo</li>
            <li>you cheated</li>
          </ul>
        </Typography>
      </Container>
    </Container>
  )
}

export default Faq;
