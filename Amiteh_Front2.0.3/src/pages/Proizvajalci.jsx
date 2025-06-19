import React from 'react';
import useFetchData from '../assets/myComponents/hooks/useFetchData'; // Adjust the path according to your project structure

const Proizvajalci = () => {
  const { makes, loading, error } = useFetchData(); // Fetch makes data using the custom hook
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCardClick = (makes) => {
    navigate(`/proizvajalci/${makes.name}`, { state: { makes } });
  };

  return (
    <div>
      {makes.map((makes) => (
        <div key={makes.id} onClick={() => handleCardClick(makes)}>
          <h2>{makes.name}</h2>
          <img src={makes.image} alt={makes.name} style={{ maxWidth: '200px' }} />
        </div>
      ))}
    </div>
  );
};

export default Proizvajalci;
