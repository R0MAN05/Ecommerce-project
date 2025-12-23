import dayjs from "dayjs";
import axios from "axios";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import BuyAgainIcon from "../../assets/icons/buy-again.png";

export function OrderDetailsGrid({ order, loadCart }) {

    return (
        <div className="order-details-grid">

            {order.products.map((orderProduct) => {
                const addToCart = async () => {
                    await axios.post(`/api/cart-items`, {
                        productId: orderProduct.product.id,   //NOTE: you can also get the productId from orderProduct.productId
                        quantity: 1
                    });
                    if (typeof loadCart === "function") {
                        await loadCart();
                    }
                };
                return (
                    <Fragment key={orderProduct.product.id} >
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details"
                            data-testid="order-product-details"
                        >
                            <div className="product-name">
                                {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                            </div>
                            <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                            <button className="buy-again-button button-primary"
                                onClick={addToCart}>
                                <img className="buy-again-icon" src={BuyAgainIcon} />
                                <span className="buy-again-message">Add to Cart</span>
                            </button>
                        </div>

                        <div className="product-actions">
                            <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>   {/* AN COMMENT: inserted order and product ids into the Links templete string. */}
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </Fragment>
                );
            })}
        </div>
    );
}