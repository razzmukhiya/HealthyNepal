import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "../../styles/ProductCard.css";
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailsCard from "../ProductDetailsCard";
import { toast } from "react-toastify";
import Rating from "../Rating";
import { server } from "../../utils/api";
import { addToCart } from "../../redux/reducers/cartSlice";
import { getImageUrl, handleImageError } from "../../utils/imageUtils";
import { addToWishlist, removeFromWishlist } from "../../redux/reducers/wishlistSlice";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data._id]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
    toast.success("Item removed from wishlist!");
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Item added to wishlist!");
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
            console.log('Adding to cart:', cartData); // Log the cart data

        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className='product-card'>
      <Link to={`/product/${data._id}`}>
        <img
          src={getImageUrl(data?.images)}
          alt={data.name} 
          className='product-image'
          onError={(e) => {
            console.log('Image load error:', e.target.src);
            e.target.onerror = null;
            handleImageError(e);
          }}
        />
      </Link>

      {data?.shop && (
        <Link to={`/shop/preview/${data.shop._id}`}>
          <div className='shop-info'>
            <h5 className='shop-name'>{data.shop.name}</h5>
            <p className='seller-info'>Seller: {data.shop.name}</p>
            <p className='shop-address'>{data.shop.address}</p>
          </div>
        </Link>   
      )}

      <Link to={`/product/${data._id}`}>
        <h4 className='product-name'>
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>

        <div className="flex">
          <Rating rating={data?.ratings || 0} />
        </div>

        <div className="product-price">
          <div className="flex">
            <h5 className='product-discount-price'>
              Rs. {data?.discountPrice || data?.originalPrice || 0}
            </h5>
            {data?.originalPrice > data?.discountPrice && (
              <h4 className='price'>
                Rs. {data.originalPrice}
              </h4>
            )}
          </div>
          <span className='sold-out'>
            {data?.sold_out || 0} sold
          </span>
        </div>
      </Link>   

      <div>
        {click ? (
          <AiFillHeart 
            size={22}
            className='icon'
            onClick={() => removeFromWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title='Remove from wishlist'
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className='icon'
            onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title='Add to wishlist'
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
  );
}

export default ProductCard;
