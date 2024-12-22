import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import "../styles/ProductsPage.css";
import { getAllProducts } from '../redux/actions/product';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const { 
        allProducts = [], 
        isLoading, 
        error, 
        currentPage, 
        hasMore 
    } = useSelector((state) => state.product || {
        allProducts: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        hasMore: true
    });
    const [data, setData] = useState([]);
    const observer = useRef();
    
    // Infinite scroll implementation
    const lastProductElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(getAllProducts(currentPage + 1, false));
            }
        });
        
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, currentPage]);

    useEffect(() => {
        console.log('Initial fetch effect triggered');
        dispatch(getAllProducts(1, true));
    }, [dispatch]);

    useEffect(() => {
        console.log('Products state update effect triggered');
        console.log('All Products:', allProducts);
        console.log('Category Data:', categoryData);
        console.log('Loading:', isLoading);
        console.log('Error:', error);

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
            console.log('Filtered products:', filteredProducts.length);
            setData(filteredProducts);
        }
    }, [allProducts, categoryData, isLoading, error]);

    const renderContent = () => {
        // Show loading state on initial load
        if (isLoading && (!data || data.length === 0)) {
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
        if (!Array.isArray(data) || data.length === 0) {
            return (
                <div className="no-products">
                    <h2>No Products Found!</h2>
                    <p>Try a different category or check back later.</p>
                </div>
            );
        }

        // Render products grid
        return (
            <>
                <h2 className="products-title">
                    {categoryData ? `${categoryData} Products` : "All Products"}
                </h2>
                <div className="products-grid">
                    {data.map((product, index) => (
                        <div 
                            ref={index === data.length - 1 ? lastProductElementRef : null}
                            key={product._id || index}
                        >
                            <ProductCard data={product} />
                        </div>
                    ))}
                </div>
                {isLoading && (
                    <div className="loading-more">
                        <p>Loading more products...</p>
                    </div>
                )}
                {!hasMore && data.length > 0 && (
                    <div className="no-more-products">
                        <p>No more products to load</p>
                    </div>
                )}
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

export default ProductsPage;
