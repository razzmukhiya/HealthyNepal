import React from 'react';
import Navbar from '../components/Navbar';

const Products = ({ addToCart }) => {
  const products = [
    { _id: '1', name: 'Product 1', price: 10 },
    { _id: '2', name: 'Product 2', price: 20 },
    { _id: '3', name: 'Product 3', price: 30 },
  ];

  return (
    <div>
      <Navbar />
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
