import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categoriesData } from "../../statics/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
// import DropDown from "./DropDown";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
// import Cart from "../cart/Cart";
// import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import "../../styles/Header.css"; // Import the CSS file

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // const { isSeller } = useSelector((state) => state.seller); 
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { cart } = useSelector((state) => state.cart);
  // const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  // const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProducts = allProducts?.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  return (
    <>
      <div className="header-section">
        <div className="header-desktop">
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
            />
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <AiOutlineSearch className="search-icon" />
            {searchData.length > 0 && (
              <div className="search-results">
                {searchData.map((product) => (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <div className="search-item">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="search-item-image"
                      />
                      <h1>{product.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* <div className="header-button">
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <h1 className="button-text">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="button-icon" />
              </h1>
            </Link>
          </div> */}
        </div>
      </div>

      <div className={`header-navbar ${active ? "active" : ""}`}>
        <div className="navbar-content">
          {/* <div onClick={() => setDropDown(!dropDown)}>
            <div className="categories-dropdown">
              <BiMenuAltLeft size={30} className="menu-icon" />
              <button className="categories-button">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="dropdown-icon"
                // onClick={() => setDropDown(!dropDown)}
              />
              {dropDown && (
                <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
              )}
            </div>
          </div> */}
          <div className="navbar-items">
            <Navbar active={activeHeading} />
          </div>
          <div className="navbar-actions">
            {/* <div className="wishlist-icon" onClick={() => setOpenWishlist(true)}>
              <AiOutlineHeart size={30} className="icon" />
              <span className="badge">{wishlist?.length}</span>
            </div>
            <div className="cart-icon" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} className="icon" />
              <span className="badge">{cart?.length}</span>
            </div> */}
            <div className="profile-icon">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    className="profile-image"
                    alt="User  Avatar"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} className="icon" />
                </Link>
              )}
            </div>
            {/* {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />} */}
          </div>
        </div>
      </div>

      <div className={`mobile-header ${active ? "active" : ""}`}>
        <div className="mobile-header-content">
          <BiMenuAltLeft size={40} className="menu-icon" onClick={() => setOpenSidebar(true)} />
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
              className="mobile-logo"
            />
          </Link>
          {/* <div className="cart-icon" onClick={() => setOpenCart(true)}>
            <AiOutlineShoppingCart size={30} />
            <span className="badge">{cart?.length}</span>
          </div>
          {openCart && <Cart setOpenCart={setOpenCart} />}
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />} */}
        </div>

        {openSidebar && (
          <div className="sidebar">
            <div className="sidebar-content">
              <div className="sidebar-header">
                <div className="wishlist-icon" onClick={() => setOpenWishlist(true)}>
                  <AiOutlineHeart size={30} className="icon" />
                  <span className="badge">{wishlist?.length}</span>
                </div>
                <RxCross1 size={30} className="close-icon" onClick={() => setOpenSidebar(false)} />
              </div>

              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData.length > 0 && (
                  <div className="search-results">
                    {searchData.map((product) => (
                      <Link key={product._id} to={`/product/${product._id}`}>
                        <div className="search-item">
                          <img
                            src={product.images[0]?.url}
                            alt={product.name}
                            className="search-item-image"
                          />
                          <h5>{product.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className="header-button">
                <Link to="/shop-create">
                  <h1 className="button-text">
                    Become Seller <IoIosArrowForward className="button-icon" />
                  </h1>
                </Link>
              </div>

              <div className="profile-section">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user.avatar?.url}
                      alt="User  Avatar"
                      className="profile-image"
                    />
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="auth-link">Login /</Link>
                    <Link to="/sign-up" className="auth-link">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;