import React, { useState, useEffect } from 'react';
import LogoCarouselObject from './LogoCarouselObject';
import RcarouselObject from './RcarouselObject';
import RcarouselRelated from './RcarouselRelated';
import useFetchData from "@/assets/myComponents/hooks/useFetchData";


const CarouselContainer = () => {
  const { makes, categories, areas, loading, error } = useFetchData();
  const makesArray = Object.values(makes);
  const categoriesArray = Object.values(categories);
  const areasArray = Object.values(areas);

  if (loading) {
    return <div>Loading... </div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex mt-5 flex-col items-center">     
     <LogoCarouselObject className="flex mt-1000" title="Proizvajalci" object={makesArray} />
      <RcarouselObject className="flex mt-1000" loading={loading} title="Kategorije" object={categoriesArray} />
      <RcarouselRelated className="flex mt-1000" title="REalated" object={categoriesArray} />

    </div>
  );
};

export default CarouselContainer;
