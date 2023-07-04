"use client";

import React from 'react'
import { usePathname } from 'next/navigation';

const GymHomePage = () => {
  const pathname = usePathname();
  return (
    <div>You selected this gym: {pathname.slice(1)} using the card</div>
  )
}

export default GymHomePage;
