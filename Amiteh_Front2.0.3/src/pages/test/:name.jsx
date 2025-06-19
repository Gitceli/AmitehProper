import React from 'react';
import { useParams } from 'react-router-dom';

const Proizvajalci = () => {
  const { name } = useParams(); // Get the dynamic parameter

  return (
    <div>
      <h1>Proizvajalci</h1>
      {name ? (
        <p>Viewing information about: {name}</p>
      ) : (
        <p>Viewing all manufacturers</p>
      )}
    </div>
  );
};

export default Proizvajalci;
