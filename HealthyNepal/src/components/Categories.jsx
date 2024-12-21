import React from 'react';
import { useNavigate } from 'react-router-dom';
import { brandingData, categoriesData } from '../statics/data';
import '../styles/Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const handleSubmit = (item) => {
    navigate(`/products?category=${item.title}`);
  };

  return (
    <div>
      <div className="section">
        <div className="branding">
          {brandingData && brandingData.length > 0 ? (
            brandingData.map((i) => (
              <div key={i.id || i.title}> {/* Ensure unique key */}
                {i.icon}
                <div className="items">
                  <h3>{i.title}</h3>
                  <p>{i.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No branding data available.</p> // Handle empty state
          )}
        </div>
      </div>

      <div className="sections category-grid" id='categories'>
        <div className="category-header">
          <h2>Shop by Categories</h2>
          <p>Find products in your favorite categories</p>
        </div>
        <div className="grid">
          {categoriesData && categoriesData.length > 0 ? (
            categoriesData.map((item) => (
              <div className="category-item"
                key={item.id}
                onClick={() => handleSubmit(item)}
              >
                <img src={item.image_Url} className='category-image' alt={item.title} />
                <h5 className='category-title'>{item.title}</h5>
                {item.subTitle && <p className="category-subtitle">{item.subTitle}</p>}
              </div>
            ))
          ) : (
            <div className="no-categories">
              <p>No categories available at the moment.</p>
              <p>Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;