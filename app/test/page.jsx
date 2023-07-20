"use client";

import React from 'react';

const CloudinaryDeleteButton = () => {
  const handleDelete = async () => {
    try {
      const publicUrl = 'https://res.cloudinary.com/prtracker/video/upload/v1689854715/banana_k8odj6.mp4'; // Replace with your public URL

      const publicID = new URL(publicUrl).pathname.split('/').pop().split('.')[0];

      const response = await fetch(`api/delete/${publicID}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete the resource.');
      }

      const data = await response.json();
      console.log('Delete response:', data);
    } catch (error) {
      console.error('Error occurred during deletion:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Resource
    </button>
  );
};

export default CloudinaryDeleteButton;
