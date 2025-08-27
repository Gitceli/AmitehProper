// pages/HomePage.tsx
import * as React from 'react';
import TripleCarouselObject from '@/assets/myComponents/TripleCarouselObject';
import LogoCarouselObject from '@/assets/myComponents/LogoCarouselObject';
import RcarouselObject from '@/assets/myComponents/RcarouselObjectt';
import Rcarousel from '@/assets/myComponents/Rcarousel';
import Products from '@/assets/myComponents/Products';
import useFetchData from '@/assets/myComponents/hooks/useFetchData';
import FadeInSection from '@/assets/myComponents/Effects/FadeIn';

export default function HomePage() {
  const { makes, categories, loading } = useFetchData();

  return (
    <>
      {/* 1) First thing: your TripleCarouselObject */}
      <section className=" bg-transparent ">
      </section>

      {/* 2) Then rest of your content */}
      <section className="py-16">
        <LogoCarouselObject title="Proizvajalci" object={makes} loading={loading} />
      </section>

      <section className="py-16">
        <RcarouselObject title="Kategorije" object={categories} />
      </section>

      <section className="py-16">
        <Rcarousel img="public/63700.png" length={20} name="Novo" />
        <Products />
      </section>

      <section className="py-16">
        <Rcarousel length={100} naslov="Carousel Naslov" />
      </section>
    </>
  );
}
