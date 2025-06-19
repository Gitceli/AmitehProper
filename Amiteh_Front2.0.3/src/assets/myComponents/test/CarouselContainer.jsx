import React from 'react';
import RcarouselObject from '../RcarouselObject';
import useFetchData from '../hooks/useFetchData'; 

const CarouselContainer = () => {
  const { makes, loading, error } = useFetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex mt-5 flex-col items-center">
      <RcarouselObject className="flex mt-1000" naslov={makes} title="Featured Makes" />
    </div>
  );
};

export default CarouselContainer;