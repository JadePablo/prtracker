"use client";

import React, { useState } from 'react';

const TinderCarousel = () => {
  
  const [profiles, setProfiles] = useState([
    { name: 'John', value: null },
    { name: 'Emma', value: null },
    { name: 'Michael', value: null },
    { name: 'Sophia', value: null },
    { name: 'William', value: null }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftSwipe = () => {
    const updatedProfiles = [...profiles];
    updatedProfiles[currentIndex].value = 1;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    setProfiles(updatedProfiles);
  };

  const handleRightSwipe = () => {
    const updatedProfiles = [...profiles];
    updatedProfiles[currentIndex].value = 2;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    setProfiles(updatedProfiles);
  };

  return (
    <div>
      <h1>Tinder Carousel</h1>
      <div>
        <button onClick={handleLeftSwipe}>Left</button>
        <button onClick={handleRightSwipe}>Right</button>
      </div>
      <div>
        <h2>{profiles[currentIndex].name}</h2>
        <p>Value: {profiles[currentIndex].value}</p>
      </div>
    </div>
  );
};

export default TinderCarousel;
