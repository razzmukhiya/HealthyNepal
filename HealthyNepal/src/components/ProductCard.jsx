import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "../styles/ProductCard.css";
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsCard from "../components/ProductDetailsCard";
import {addToWishlist, removeFromWishlist} from "../redux/actions/wishList";
import { addToCart } from "../redux/actions/cart";
import {toast} from "react-toastify";
import Rating from "../components/Rating";
import "../styles/ProductCard.css";

const ProductCard = ({data, isEvent}) => {
  const {wishlist} = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id))
//      setClick(true);
  
//   } else {
//     setClick(false);
//   }
// )

useEffect(() => {
  if (wishlist && wishlist.find((i) => i._id === data._id)) {
    setClick(true);
  } else {
    setClick(false);
  }
}, [wishlist]);

const removeFromWishlistHandler = (data) => {
  setClick(!click);
  dispatch(removeFromWishlist(data));
};

const addToWishlistHandler = (data) => {
  setClick(!click);
  dispatch(addToWishlist(data));
};

const addToCartHandler = (id) => {
  const isItemExists = cart && cart.find((i) => i._id === id);
  if (isItemExists) {
    toast.error("Item already in cart!");
  } else {
    if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  }
};

  return (
    <div className='product-card'>
    <Link to={`${isEvent ? `product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
    <img
     src={`${data.image && data.image[0]?.url}`}
      alt="" 
      className='product-image'
      />
    </Link>

    <Link to={`/shop/preview/${data?.shop._id}`}>
      <h5 className='shop-name'>{data.shop.name}</h5>
    </Link>   

    <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
    <h4 className='product-name'>
      {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
    </h4>

    <div className="flex">
      <Rating rating={data?. ratings} />
    </div>

<div className="product-price">
  <div className="flex">
    <h5 className='product-discount-price'>
      {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}$
    </h5>

    <h4 className='price'>
      {data.originalPrice ? data.originalPrice + " $" : null}
    </h4>
  </div>
    <span className='sold-out'>
    {data?.sold_out} sold
    </span>
    </div>
    </Link>   

    <div>
      {click ? (
        <AiFillHeart 
        size={22}
        className='icon'
        onClick={() => removeFromWishList(data)}
        color={click ? "red" : "#333"}
        title='Remove from wishlist'
        />
      
      ) : (
        <AiOutlineHeart
        size={22}
        className='icon'
        onClick={() => addToWishlistHandler(data)}
        color={click ? "red" : "#333"}
        title='Add t0 Cart'
        />
      )}
      <AiOutlineEye 
        size={22}
        className='icon icon-eye'
        onClick={() => setOpen(!open)}
        color='#333'
        title='Quick view'
        />

      <AiOutlineShoppingCart 
      size={25}
      className='icon icon-cart'
      onClick={() => addToCartHandler(data._id)}
      color='#444'
      title='Add to cart'
      />
      {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
    </div>
    </div>
  )
}

export default ProductCard
