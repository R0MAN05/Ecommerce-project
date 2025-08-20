import axios from "axios";
import { Routes, Route } from "react-router";
import { useState, useEffect} from 'react';
import { HomePage } from "./pages/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { UrlNotFoundPage } from "./pages/UrlNotFoundPage";
import "./App.css";

function App() {

  const [cart, setCart] = useState([]);    //lifted the state up so different components and pages could use it.

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')       // to get the data inside cart. in HomePage.jsx cus homepage has that cart icon that displays how many items are in the cart.  // ?expand=product is an query parameter which lets us add additional info to out request (when backend recieves the query parameter its gonna add product detail to the cart its gonna expand the cart with product details)
      .then( (response) => {
        setCart(response.data);
      })
    }, []);

  return (
    <div>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage  cart={cart} />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<UrlNotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
