import { Header } from "../components/Header";
import CheckmarkIcon from "../assets/images/icons/checkmark.png";
import { products } from "../../starting-code/data/products";
import "./Homepage.css";

export function HomePage() {

  fetch('http://localhost:3000/api/products')     //fetch is an inbuilt Js function which fetchs data from the URL inside (). 
      // this code is an asynchronous code.
      //Fetch returns a Promise. and a Promise lets us wait for asynchronous code to finish.
      // NOTE: we cant save this data in a variable (for eg: const products = fetch(); )

    .then( (response) => {             //Promise has a method ".then" . How this code works is fetch('http://localhost:3000/api/products'); this function contacts the backend to get some data, but it take sometimes for the backend to respond so the code below this function (here return) is gonna run line by line, then at some point in the future this function is going to finish, we would get the response from the backend, when it(fetch) finishes in the future it will run the arrow function inside .then() thats how a promise works . And the respond is the response used as parameter in .then() function.
      return response.json();  //response.json gives the data that is attached to the response in this case its products details. it is also asynchronous [cant save this in a variable]
    }).then((data) => {      //this .then() waits for return response.json(); to finish then run the arrow function inside it. The data parameter is whats inside the response that backend gave, this is how we can get to access the data from backend.
      console.log(data);
    });

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header />

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
