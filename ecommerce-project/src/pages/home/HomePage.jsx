import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductsGrid';
import "./Homepage.css";


export function HomePage({ cart }) {

  const [products, setProducts] = useState([]);

  useEffect( () => {
    axios.get('/api/products')     //this does the same work as the code before in the previous commit.
      .then( (response) => {  
        setProducts(response.data);    //saving the products all the info in state for further usages. 
      });
  }, []);     //we used useEffect here cus this all requesting to the backend, and getting the response, using the data inside the response is in Homepage file and the problem is when we refresh the homepage, axios sends a request to the backend everytime the page refreshes. so we used useEffect with [] an empty dependency array which controls when useEffect runs, resulting in running only once.


  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header 
        cart = {cart}
      />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
