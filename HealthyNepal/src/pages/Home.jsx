import React from 'react';
import Navbar from '../components/Navbar'; 
import Hero from '../components/Hero';
import Categories from "../components/Categories";
import HomeProducts from '../components/HomeProducts';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <HomeProducts />
    </div>
  )
}

export default Home
