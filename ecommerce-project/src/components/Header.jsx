import {useState} from 'react';
import { NavLink } from "react-router";
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/icons/logo-white.png';
import MobileLogoWhite from '../assets/images/icons/mobile-logo-white.png';
import "./Header.css";

export function Header({ cart = [] }) { // default to empty array so cart.forEach won't fail. The default parameter ({ cart = [] }) prevents the forEach TypeError when cart is undefined.

  const[searchTerm, setSearchTerm] = useState("");
  let totalQuantity = 0;

  cart.forEach( (cartItem) => { 
    
    totalQuantity += cartItem.quantity;
  });

  const updateSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  const searchProducts = () => {
    console.log(searchTerm)
  }

  return (
    <div>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={LogoWhite} />
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={searchTerm} onChange={updateSearchInput}/>

          <button className="search-button}" onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
