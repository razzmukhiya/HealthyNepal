import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import "../styles/ProductsPage.css";
import { getAllProducts } from '../redux/actions/product';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const { allProducts = [], isLoading, error } = useSelector((state) => {
        console.log('Current Redux State:', state);
        return state.product || { allProducts: [], isLoading: true, error: null };
    });
    const [data, setData] = useState([]);
    
    useEffect(() => {
        console.log('ProductsPage mounted, dispatching getAllProducts');
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        console.log('allProducts or categoryData changed:', { allProducts, categoryData });
        
        if (!Array.isArray(allProducts)) {
            console.log('allProducts is not an array, setting empty data');
            setData([]);
            return;
        }
        
        if (categoryData === null) {
            console.log('No category filter, setting all products');
            setData(allProducts);
        } else {
            console.log('Filtering products by category:', categoryData);
            const filteredProducts = allProducts.filter((i) => i.category === categoryData);
            console.log('Filtered products:', filteredProducts);
            setData(filteredProducts);
        }
    }, [allProducts, categoryData]);

    // Handle loading state
    if (isLoading) {
        return (
            <div className="products-page">
                <div className="products-container">
                    <div className="loading">
                        <h2>Loading products...</h2>
                        <p>Please wait while we fetch the products.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Handle error state - ignore authentication errors for public routes
    if (error && !error.includes('No authentication token found') && !error.includes('Please login to continue')) {
        console.error('Error state:', error);
        return (
            <div className="products-page">
                <div className="products-container">
                    <div className="error">
                        <h2>Error loading products</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Handle empty data state
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="products-page">
                <div className="products-container">
                    <div className="no-products">
                        <h2>No Products Found!</h2>
                        <p>Try a different category or check back later.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Render products
    return (
        <div className="products-page">
            <div className="products-container">
                <h2 className="products-title">
                    {categoryData ? `${categoryData} Products` : "All Products"}
                </h2>
                <div className="products-grid">
                    {data.map((product, index) => {
                        console.log('Rendering product:', product);
                        return (
                            <ProductCard 
                                data={product} 
                                key={product._id || index} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;
