import React, { useEffect, useState, useCallback, useRef } from 'react';
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
        dispatch(getAllProducts(1, true));
    }, [dispatch]);

    useEffect(() => {
        if (!Array.isArray(allProducts)) {
            setData([]);
            return;
        }
        
        if (categoryData === null) {
            setData(allProducts);
        } else {
            const filteredProducts = allProducts.filter((i) => i.category === categoryData);
            setData(filteredProducts);
        }
    }, [allProducts, categoryData]);

    const renderContent = () => {
        if (isLoading && (!data || data.length === 0)) {
            return (
                <div className="loading">
                    <h2>Loading products...</h2>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error">
                    <h2>Error loading products</h2>
                    <p>{error}</p>
                </div>
            );
        }

        if (!Array.isArray(data) || data.length === 0) {
            return (
                <div className="no-products">
                    <h2>No Products Found!</h2>
                </div>
            );
        }

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
