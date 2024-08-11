import React from "react";
import HeroSection from './../Hero/HeroSection';
import Footer from './../Footer/Footer';
import BrowseByCategory from './../BrowseByCategory/BrowseByCategory';
import FeaturedCars from './../FeaturedCar/FeaturedCars';
import FAQ from "../FaqComponent/FAQ";


const HomePage = () => (
  <>
   <HeroSection/>
   <FeaturedCars/>
   <BrowseByCategory/>
   <FAQ/>
   <Footer/>
  </>
);

export default HomePage;