import axios from "axios";
import { Routes, Route } from "react-router";
import { useState, useEffect} from 'react';
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { UrlNotFoundPage } from "./pages/UrlNotFoundPage";
import "./App.css";

function App() {

  const [cart, setCart] = useState([]);    //lifted the state up so different components and pages could use it.

  useEffect(() => {
    const fetchAppData = async () => {             //used async await inside an useEffect to get the cart data form the backend.
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    }
    fetchAppData();
    }, []);

  return (    //below passing the lifted state in the form of props and accessing it in the form of objects (for eg: cart={cart} and {cart} as object in the required components).
    <div>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage  cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />   {/* :orderId and :productId are called URL parameters. We can replace them with any text, and this allows us to save an order id and a product id directly in the URL. */}
        <Route path="*" element={<UrlNotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
