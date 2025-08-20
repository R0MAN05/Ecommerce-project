import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../components/Header";
import CheckmarkIcon from "../assets/images/icons/checkmark.png";
import "./Homepage.css";


export function HomePage() {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect( () => {
    axios.get('/api/products')     //this does the same work as the code before in the previous commit.
      .then( (response) => {  
        setProducts(response.data);    //saving the products all the info in state for further usages. 
      });

    axios.get('/api/cart-items')       // to get the data inside cart. in HomePage.jsx cus homepage has that cart icon that displays how many items are in the cart.
      .then( (response) => {
        setCart(response.data);
      })
  }, []);     //we used useEffect here cus this all requesting to the backend, and getting the response, using the data inside the response is in Homepage file and the problem is when we refresh the homepage, axios sends a request to the backend everytime the page refreshes. so we used useEffect with [] an empty dependency array which controls when useEffect runs, resulting in running only once.


  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header 
        cart = {cart}
      />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${
                      product.rating.stars * 10
                    }.png`}
                  />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  ${(product.priceCents / 100).toFixed(2)}
                </div>

                <div className="product-quantity-container">
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src={CheckmarkIcon} />
                  Added
                </div>

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
