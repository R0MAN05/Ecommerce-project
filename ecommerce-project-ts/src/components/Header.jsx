import {useState} from 'react';
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import CartIcon from '../assets/icons/cart-icon.png';
import SearchIcon from '../assets/icons/search-icon.png';
import LogoWhite from '../assets/icons/logo-white.png';
import MobileLogoWhite from '../assets/icons/mobile-logo-white.png';
import "./Header.css";

export function Header({ cart = [] }) { // default to empty array so cart.forEach won't fail. The default parameter ({ cart = [] }) prevents the forEach TypeError when cart is undefined.

    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');   // I need to use a different variable name since "search"
  // is already being used below.

  const[search, setSearch] = useState(searchText || '');  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  let totalQuantity = 0;

  cart.forEach( (cartItem) => { 
    
    totalQuantity += cartItem.quantity;
  });

  const updateSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const searchProducts = () => {
    navigate(`/?search=${search}`) //when the search button is clicked this function is called (navigate to URL "/?search=${search}" , navigating to / will navigate to the homepage. ?search=${search} saves the search text in the URL so we can share it between pages).
  }

const navigate = useNavigate(); // useNavigate a hook used to navigate ro homepage in order to show the search results.

  return (
    <div>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" data-testid="header-logo" src={LogoWhite} />
            <img className="mobile-logo" data-testid="header-mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" data-testid="header-search-bar" value={search} onChange={updateSearchInput}/>

          <button className="search-button" data-testid="header-search-button" onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders" data-testid="header-orders-link">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout" data-testid="header-cart-link">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
