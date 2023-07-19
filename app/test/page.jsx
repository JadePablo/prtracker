"use client";

import React from 'react';

function EmailButton() {
  const handleVerifyClick = async () => {

    const mock_pr = {
      lift: 'bench',
      weight: 200,
      location: 'alphaland',
      lifter: 'John Doe',
      verified: true,
      lifterEmail: 'jadepablo97@gmail.com',
      beaten: false
    };

    try {
      const response = await fetch('/api/send-email/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'jadepablo97@gmail.com' ,pr: mock_pr})
      });

      if (response.ok) {
        console.log('Verification email sent successfully');
      } else {
        console.error('Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const handleRejectClick = async () => {
    const mock_pr = {
      lift: 'bench',
      weight: 200,
      location: 'alphaland',
      lifter: 'John Doe',
      verified: true,
      lifterEmail: 'jadepablo97@gmail.com',
      beaten: false
    };
    try {
      const response = await fetch('/api/send-email/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'jadepablo97@gmail.com' , pr: mock_pr})
      });

      if (response.ok) {
        console.log('Rejection email sent successfully');
      } else {
        console.error('Failed to send rejection email');
      }
    } catch (error) {
      console.error('Error sending rejection email:', error);
    }
  };

  const handleBanClick = async () => {
    const mock_pr = {
      lift: 'bench',
      weight: 200,
      location: 'alphaland',
      lifter: 'John Doe',
      verified: true,
      lifterEmail: 'jadepablo97@gmail.com',
      beaten: false
    };
    try {
      const response = await fetch('/api/send-email/ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'jadepablo97@gmail.com' , pr: mock_pr})
      });

      if (response.ok) {
        console.log('Ban email sent successfully');
      } else {
        console.error('Failed to send ban email');
      }
    } catch (error) {
      console.error('Error sending ban email:', error);
    }
  };

  const handleNotifyClick = async () => {
    const mock_pr = {
      lift: 'bench',
      weight: 200,
      location: 'alphaland',
      lifter: 'John Doe',
      verified: true,
      lifterEmail: 'jadepablo97@gmail.com',
      beaten: false
    };
    try {
      const response = await fetch('/api/send-email/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({pr: mock_pr})
      });

      if (response.ok) {
        console.log('Ban email sent successfully');
      } else {
        console.error('Failed to send ban email');
      }
    } catch (error) {
      console.error('Error sending ban email:', error);
    }
  };

  return (
    <div>
      <button onClick={handleVerifyClick}>Verify</button>
      <button onClick={handleRejectClick}>Reject</button>
      <button onClick={handleBanClick}>Ban</button>
      <button onClick={handleNotifyClick}>Notify</button>


    </div>
  );
}

export default EmailButton;
