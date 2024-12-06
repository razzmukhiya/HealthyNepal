import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/DropDown.css';

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
  };

  return (
    <div className="dropdown-container">
      {categoriesData && categoriesData.length > 0 && (
        <ul>
          {categoriesData.map((category, index) => (
            <li key={index} className="dropdown-item" onClick={() => handleCategoryClick(category)}>
              <img src={category.image_Url} alt={category.title} />
              <h3>{category.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;


