"use client";

import React from 'react';
import PrFeed from '@components/PrFeed';
import { usePathname } from 'next/navigation';
import PrForm from '@components/Form';
import { useSession } from 'next-auth/react';

const GymHomePage = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div>
      <p>You selected this gym: {pathname.slice(1)}</p>
      {session?.user ? (
        <PrForm />
      ) : (
        <p>You must be logged in to submit a PR.</p>
      )}
      <PrFeed />
    </div>
  );
};

export default GymHomePage;
