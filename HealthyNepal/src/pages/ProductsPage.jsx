import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import  "../styles/ProductsPage.css";


const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const allProducts = useSelector((state) => state.products);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        if (categoryData === null) {
            const d = allProducts;
            setData(d);
        } else {
            const d = allProducts && allProducts.filter((i) => i.category === categoryData);
            setData(d);
        }
    }, [allProducts]);
  return (
    <div>
      {data && data.map((i, index) => <ProductCard data={i} key={index} />)}

      {data && data.length === 0 ? (
        <h1>No Product Found!</h1>
      ) : null }
    </div>
  )
}

export default ProductsPage;
