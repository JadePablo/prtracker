"use client";

import React from "react";
import { Container } from "@mui/material";
import GymFeed from "@components/GymFeed";
import HomepageFooter from "@components/HomepageFooter";
import Welcome from "@components/Welcome";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Welcome />
      <GymFeed />
      <HomepageFooter sx={{ marginTop: 'auto' }} />

    </Container>
  )
}

export default Home;
