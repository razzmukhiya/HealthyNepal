import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Vendorsidebar from "../../components/SellerDashboard/Vendorsidebar";
import Vendornavtop from '../../components/SellerDashboard/Vendornavtop';
import { getAllProductsShop } from '../../redux/actions/product';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "../../styles/VendorProducts.css";

const Products = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.sellers);
  const { allProducts: products } = useSelector((state) => state.product);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  return (
    <div className="vendor-container">
      <Vendorsidebar active={3} />
      <div className="vendor-content">
        <div className="vendor-header">
          <Vendornavtop />
        </div>
        <div className="vendor-body">
          <div className="products-header">
            <h3 className="products-title">All Products</h3>
            <Link to="/seller/add-products">
              <button className="products-add-btn">
                Add New Product
              </button>
            </Link>
          </div>

          <div className="products-summary">
            <div className="summary-card">
              <h4>Total Products</h4>
              <p>{products?.length || 0}</p>
            </div>
            <div className="summary-card">
              <h4>Total Categories</h4>
              <p>{[...new Set(products?.map(item => item.category))].length || 0}</p>
            </div>
            <div className="summary-card">
              <h4>Total Stock</h4>
              <p>{products?.reduce((total, item) => total + (item.stock || 0), 0)}</p>
            </div>
            <div className="summary-card">
              <h4>Total Sales</h4>
              <p>{products?.reduce((total, item) => total + (item.sold_out || 0), 0)}</p>
            </div>
          </div>

          <div className="products-table">
            <div className="table-header">
              <div className="header-cell">NO</div>
              <div className="header-cell">IMAGE</div>
              <div className="header-cell">NAME</div>
              <div className="header-cell">CATEGORY</div>
              <div className="header-cell">COMPANY</div>
              <div className="header-cell">PRICE</div>
              <div className="header-cell">DISCOUNT</div>
              <div className="header-cell">STOCK</div>
              <div className="header-cell">ACTION</div>
            </div>
            
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <div key={product._id} className="table-row">
                  <div className="table-cell"><span>{index + 1}</span></div>
                  <div className="table-cell image-cell">
                    <img 
                      src={product.images[0]?.url || `/uploads/${product.images[0]?.public_id}` || "/src/assets/default-product.png"}


                      alt={product.name} 
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/src/assets/default-product.png";


                      }}
                    />
                  </div>
                  <div className="table-cell"><span>{product.name}</span></div>
                  <div className="table-cell"><span>{product.category}</span></div>
                  <div className="table-cell"><span>{product.brand || '-'}</span></div>
                  <div className="table-cell">
                    <span>₹{product.discount ? product.discountPrice : product.originalPrice}</span>
                    {product.discount > 0 && (
                      <span className="original-price">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="table-cell"><span>{product.discount || '0'}%</span></div>
                  <div className="table-cell"><span>{product.stock}</span></div>
                  <div className="table-cell actions">
                    <Link to={`/seller/products/view/${product._id}`}>

                      <button className="view-btn" title="View Product" style={{padding: '4px', width: '32px', height: '32px'}}>
                        <AiOutlineEye size={20} style={{color: '#ffffff'}} />
                      </button>
                    </Link>
                    <Link to={`/seller/products/edit/${product._id}`}>

                      <button className="edit-btn" title="Edit Product" style={{padding: '4px', width: '32px', height: '32px'}}>
                        <AiOutlineEdit size={20} style={{color: '#000000'}} />
                      </button>
                    </Link>
                    <Link to={`/seller/products/delete/${product._id}`}>
                      <button className="delete-btn" title="Delete Product" style={{padding: '4px', width: '32px', height: '32px'}}>
                        <AiOutlineDelete size={20} style={{color: '#ffffff'}} />
                      </button>
                    </Link>

                  </div>
                </div>
              ))
            ) : (
              <div className="products-empty">
                <h3 className="products-empty-title">No products found</h3>
                <p className="products-empty-text">Start by adding a new product to your shop.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
