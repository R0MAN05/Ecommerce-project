import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./CheckoutPage.css";



export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([null]);  //null cuz initaially if the cart orders is empty the payment summary would be null.

  useEffect(() => {
    //to get delivery date from backend
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data); //updating the state using updater function.
      });

    axios
      .get("api/payment-summary") //to get the payment calculations from backend.
      .then((response) => {
        setPaymentSummary(response.data);
      });
  }, []); //[] to run this effect only ones.

  return (
    <>
      <title>Checkout</title>

      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
