import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar'; 
import Hero from '../components/Hero';
import Categories from "../components/Categories";
import ProductsPage from './ProductsPage';
import { getAllProducts } from '../redux/actions/product';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products from API
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <ProductsPage />
    </div>
  )
}

export default Home
