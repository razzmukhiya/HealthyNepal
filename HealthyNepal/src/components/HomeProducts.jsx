import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard/ProductCard";
import { getAllProducts } from '../redux/actions/product';
import "../styles/ProductsPage.css";

const HomeProducts = () => {
    const dispatch = useDispatch();
    const { 
        allProducts = [], 
        isLoading, 
        error
    } = useSelector((state) => state.product || {
        allProducts: [],
        isLoading: false,
        error: null
    });

    useEffect(() => {
        console.log('HomeProducts: Initial fetch effect triggered');
        dispatch(getAllProducts(1, true));
    }, [dispatch]);

    const renderContent = () => {
        // Show loading state on initial load
        if (isLoading && (!allProducts || allProducts.length === 0)) {
            return (
                <div className="loading">
                    <h2>Loading products...</h2>
                    <p>Please wait while we fetch the products.</p>
                </div>
            );
        }

        // Handle error state - ignore authentication errors for public routes
        if (error && !error.includes('No authentication token found') && !error.includes('Please login to continue')) {
            console.error('Error state:', error);
            return (
                <div className="error">
                    <h2>Error loading products</h2>
                    <p>{error}</p>
                    <button onClick={() => dispatch(getAllProducts(1, true))} className="retry-button">
                        Retry
                    </button>
                </div>
            );
        }

        // Handle empty data state
        if (!Array.isArray(allProducts) || allProducts.length === 0) {
            return (
                <div className="no-products">
                    <h2>No Products Found!</h2>
                    <p>Check back later for new products.</p>
                </div>
            );
        }

        // Render products grid
        return (
            <>
                <h2 className="products-title">Featured Products</h2>
                <div className="products-grid">
                    {allProducts.slice(0, 8).map((product, index) => (
                        <div key={product._id || index}>
                            <ProductCard data={product} />
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="products-page">
            <div className="products-container">
                {renderContent()}
            </div>
        </div>
    );
}

export default HomeProducts;
