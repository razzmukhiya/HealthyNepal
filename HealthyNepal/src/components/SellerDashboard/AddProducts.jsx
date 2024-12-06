import React, { useState } from 'react';
import Vendorsidebar from "../../components/VendorDashboard/Vendorsidebar";
import Vendornavtop from '../../components/VendorDashboard/Vendornavtop';
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
    <div>
      <Vendorsidebar />
      <Vendornavtop />
      
      
    </div>
  )
}

export default AddProducts
