import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/actions/product"; // Import the action
import ProductCard from "./ProductCard/ProductCard";
import "../styles/BestDeals.css";

const BestDeals = () => {
    const [data, setData] = useState([]);
    const allProducts = useSelector((state) => state.products.allProducts);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        console.log("All Products:", allProducts); // Log all products
        if (Array.isArray(allProducts) && allProducts.length > 0) {
            const sortedData = [...allProducts].sort((a, b) => {
                const soldOutA = typeof a.sold_out === 'number' ? a.sold_out : 0;
                const soldOutB = typeof b.sold_out === 'number' ? b.sold_out : 0;
                return soldOutB - soldOutA; // Ensure sold_out is a number
            });
            const firstFive = sortedData.slice(0, 5);
            setData(firstFive);
            console.log("Best Deals Data:", firstFive); // Log best deals data
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