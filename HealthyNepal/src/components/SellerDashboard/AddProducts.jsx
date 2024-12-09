import React, { useState } from 'react';
import Vendorsidebar from "./Vendorsidebar";
import Vendornavtop from './Vendornavtop';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AddProducts = () => {
  const { seller } = useState((state) => state.seller);
  const { success, error } = useState((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch;

  const [image, setImage] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stoke: "",
  })
  return (
    <>
    <div className="create-product-container">
      <h5></h5>
    </div>
     
    </>
  )
}

export default AddProducts
