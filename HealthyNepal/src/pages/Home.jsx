import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from "../components/Categories";
import ProductsPage from './ProductsPage';
// import BestDeals from "../components/BestDeals";



const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      {/* <BestDeals /> */}
      <ProductsPage />
      
    </div>
  )
}

export default Home
