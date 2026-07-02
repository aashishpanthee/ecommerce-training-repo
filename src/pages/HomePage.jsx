import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProductGrids from '../components/ProductGrids';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductGrids />
      <Footer />
    </>
  );
};

export default HomePage;
