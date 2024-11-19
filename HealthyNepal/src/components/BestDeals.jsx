import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import "../styles/BestDeals.css";

const BestDeals = () => {
    // const [data, setData] = useState([]);
    // const {allProducts} = useSelector((state) => state.products);
    
    // useEffect(() => {
    //     const allProductsData = allProducts ? [...allProducts] : [];
    //     const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    //     const firstFive = sortedData && sortedData.slice(0, 5);
    //     setData(firstFive);
    // }, [allProducts]);

    const [data, setData] = useState([]);
    const allProducts = useSelector((state) => state.products.allProducts);
    const [isLoading, setIsLoading] = useState(true);
  
    // useEffect(() => {
    //   if (allProducts) {
    //     const allProductsData = [...allProducts];
    //     const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    //     const firstFive = sortedData.slice(0, 5);
    //     setData(firstFive);
    //     setIsLoading(false);
    //   }
    // }, [allProducts]);

    useEffect(() => {
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        const sortedData = [...allProducts].sort((a, b) => b.sold_out - a.sold_out); // Ensure sold_out is a number
        const firstFive = sortedData.slice(0, 5);
        setData(firstFive);
      }
      setIsLoading(false);
    }, [allProducts]);
  
    if (isLoading) {
      return <div>Loading best deals...</div>; // Show a loading indicator
    }
  


  return (
    <div className='best-deals'>
        <div className="section">
            <div className="heading">
                <h1>Best Deals</h1>
            </div>
            <div className="Grids">
                {data && data.length > 0 && (
                    <div>
                        {data.map((item) => (
                            <ProductCard key={item.id} data={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
      
    </div>
  )
}

export default BestDeals;
