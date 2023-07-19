"use client";

import React from 'react';

function EmailButton() {
  const handleEmailClick = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'jadepablo97@gmail.com' })
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <button onClick={handleEmailClick}>Send Email</button>
  );
}

export default EmailButton;
