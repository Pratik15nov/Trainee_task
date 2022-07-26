import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import Cartproduct from "./Cartproduct";
import { EventEmitter } from "../../utils/helper";

export default function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Data")));
  });

  const orderSubtotal = Object.values(cart).reduce(
    (r, { price }) => r + price,
    0
  );
  const handleDelete = (itemId) => {
    const items = cart.filter((item) => item.id !== itemId);
    setCart(items);
    localStorage.setItem("Data", JSON.stringify(items));
    EventEmitter.dispatch("DELETE", items);
  };
  const shipCharge = orderSubtotal > 500 ? 0 : 40;
  const tax = (orderSubtotal / 100) * 18;
  const Total = orderSubtotal + tax + shipCharge;

  return (
    <div className="container">
      <div className="mb-5 row">
        <div
          className={
            orderSubtotal > 0
              ? "pe-xl-3 col-lg-8 card "
              : "pe-xl-3 col-lg-12 card"
          }
        >
          <div className="cart mb-3">
            <div className="cart-body" />
            <div className="main-content">
              <h4 className="main-heading main">Shopping Cart</h4>
              <div className="text">
                <p>You have {cart.length} items in your cart.</p>{" "}
              </div>
              <div style={{ display: orderSubtotal > 0 ? "block" : "none" }}>
                <button
                  className="dbutton"
                  type="button"
                  onClick={() => setCart([])}
                >
                  Clear all
                </button>
              </div>
            </div>
            <div
              className={
                cart.length > 3
                  ? "container scroll mt-5  "
                  : "container  mt-5 "
              }
            >
              <div className="d-flex justify-content-center row">
                {cart.length > 0 ? (
                  cart.map((card, id) => {
                    return (
                      <Cartproduct
                        card={card}
                        key={card.id}
                        onDelete={handleDelete}
                      />
                    );
                  })
                ) : (
                  <div className="col-md-10 main pt-2">
                    <img
                      src="/images/empty-cart.webp"
                      className=" mx-auto d-block"
                      alt="..."
                    />
                    <p className="header_one">Your cart is empty.</p>
                    <p className="header_two">
                      Please add product to your cart list
                    </p>
                    <Link to="/">
                      <button className="carthome button">Go to Home</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ display: orderSubtotal > 0 ? "block" : "none" }}
          className="col-lg-4 main"
        >
          <div className="mb-5 card">
            <div className="card-header">
              <h6 className="mb-0 text">Order Summary</h6>
            </div>
            <div className="py-4 card-body">
              <p className="text-muted text-sm">
                Shipping and additional costs are calculated based on values you
                have entered.
              </p>
              <table className="table card-text">
                <tbody>
                  <tr>
                    <th className="py-4">Order Subtotal</th>
                    <td className="py-4 text-end text-muted">
                      &#x20b9; {orderSubtotal}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4">Shipping Charge</th>
                    <td className="py-4 text-end text-muted">
                      &#x20b9;{shipCharge}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4">Tax (SGST+ CGST)</th>
                    <td className="py-4 text-end text-muted">
                      &#x20b9; {tax.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-4 border-0">Total</th>
                    <td className="pt-4 border-0 text-end h5 fw-normal">
                      &#x20b9;
                      {Total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-muted text-sm">
                Final price and discounts will be determined at the time of
                payment processing.
              </p>
              <div className="overflow-hidden p-0 card-footer">
                <div className="d-grid">
                  <Link to="/checkout">
                    <button className="button">Proceed to Checkout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
