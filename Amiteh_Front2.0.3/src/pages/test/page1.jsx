import * as React from "react"

//import  Rcarousel from "@/components/myComponents/Rcarousel"
import Rcarousel from "@/assets/myComponents/Rcarousel"
import RcarouselGPT from "@/assets/myComponents/RcarouselGPT"
import NavMenu from "@/assets/myComponents/NavMenuFull"
import Hero from "@/assets/myComponents/herro"
import Products from "@/assets/myComponents/Products"
import LogoCarouselObject from '@/assets/myComponents/LogoCarouselObject'
import RcarouselObject from '@/assets/myComponents/RcarouselObject'
import RcarouselRelated from '@/assets/myComponents/RcarouselRelated'

import useFetchData from "@/assets/myComponents/hooks/useFetchData"



const homepage = () => {
  const { makes, categories, areas, loading,  error } = useFetchData();
  return <>
    <Hero/>
    <LogoCarouselObject className="flex mt-1000"  title="Proizvajalci" object={makes} loading={loading} />
    <div className="flex mt-5 flex-col items-center">     
    <RcarouselObject className="flex mt-1000"  title="Kategorije" object={categories}   />
    <RcarouselRelated className="flex mt-1000" title="Podrocja" object={areas} loading={loading}/>
    </div>
    <div className="flex mt-5 flex-col items-center">
      <Rcarousel className="flex mt-1000" img="public/63700.png" length={20}  name="Novo" />
    <Products />
    </div>

    <div className="flex mt-5 flex-col items-center">
      <Rcarousel className="flex mt-1000" length={100}  naslov="Carousel Naslov"/>    
    </div>
  </>
};

export default homepage;
// gre pod  <div cl assName="flex mt-5 flex-col items-center">// <RcarouselGPT className="flex mt-5" length={10} naslov="Carousel Naslov" />