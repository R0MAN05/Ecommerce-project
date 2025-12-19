import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from "../../components/Header";
import { ProductsGrid } from './ProductsGrid';
import "./Homepage.css";


export function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {            //here used the proper way of using async await code inside an useEffect. for more info check from 1:42:24 react course lesson 7. VVI
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath)
      setProducts(response.data);
    };
    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header
        cart={cart}
      />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
