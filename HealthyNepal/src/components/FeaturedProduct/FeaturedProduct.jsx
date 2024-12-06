import React from "react";
import { useSelector } from "react-redux";
import '../../styles/FeaturedProduct.css'; 
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
   
  return (
    <div>
      <div className="section">
        <div className="heading">
          <h1>Featured Products</h1>
        </div>
        <div className="grid-container">
          {
            allProducts && allProducts.length !== 0 && (
              <>
                {allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;