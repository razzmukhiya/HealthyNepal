import React from 'react';
import Navbar from '../components/Navbar'; 
import Hero from '../components/Hero';
import Categories from "../components/Categories";
import ProductsPage from './ProductsPage';
// import Header from "../components/Layouts/Header";
// import BestDeals from "../components/BestDeals";
// import FeaturedProduct from '../components/FeaturedProduct/FeaturedProduct';



const Home = () => {
  return (
    <div>
      {/* <Header activeHeading={1} /> */}
      <Navbar />
      <Hero />
      <Categories />
      {/* <BestDeals /> */}
      <ProductsPage />
      {/* <FeaturedProduct /> */}
      
      
    </div>
  )
}

export default Home
