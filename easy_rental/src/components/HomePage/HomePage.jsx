import React from "react";
import HeroSection from './../Hero/HeroSection';
import Footer from './../Footer/Footer';
import BrowseByCategory from './../BrowseByCategory/BrowseByCategory';
import FeaturedCars from './../FeaturedCar/FeaturedCars';


const HomePage = () => (
  <>
   <HeroSection/>
   <FeaturedCars/>
   <BrowseByCategory/>
   <Footer/>
  </>
);

export default HomePage;