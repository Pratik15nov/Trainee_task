import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import Cartproduct from "./Cartproduct";
import { EventEmitter } from "../../utils/helper";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [ship, setShip] = useState();

  // console.log(JSON.parse(localStorage.getItem("Data")));

  useEffect(() => {
    shipCharge();
    setCart(JSON.parse(localStorage.getItem("Data")));
    // eslint-disable-next-line
  }, []);

  // console.log(JSON.parse(localStorage.Data));

  const orderSubtotal = Object.values(cart).reduce(
    (r, { rate }) => r + rate,
    0
  );
  const handleDelete = (itemId) => {
    const items = cart.filter((item) => item.id !== itemId);
    setCart(items);
    localStorage.setItem("Data", JSON.stringify(items));
    console.log(itemId);
    EventEmitter.dispatch("DATA", items);
  };

  const shipCharge = () => {
    if (orderSubtotal < 500) {
      return setShip(40);
    }
    return setShip(0);
  };

  const orderGreaterTehnZero = () => {
    return orderSubtotal > 0;
  };

  const deleteAll = () => {
    setCart([]);
  };

  return (
    <div className="container">
      <div className="mb-5 row">
        <div
          className={
            orderGreaterTehnZero()
              ? "pe-xl-3 col-lg-8 card "
              : "pe-xl-3 col-lg-12 card"
          }
        >
          <div className="cart mb-3">
            <div className="cart-body" />
            <div className="main-content">
              <h4 className="main-heading main">Shopping Cart</h4>
              <div>
                <p>You have {cart.length} items in your cart.</p>{" "}
              </div>
              <div
                style={{ display: orderGreaterTehnZero() ? "block" : "none" }}
              >
                <button className="dbutton" type="button" onClick={deleteAll}>
                  Clear all
                </button>
              </div>
            </div>
            <div className="container scroll  mt-5 ">
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
          style={{ display: orderGreaterTehnZero() ? "block" : "none" }}
          className="col-lg-4 main"
        >
          <div className="mb-5 card">
            <div className="card-header">
              <h6 className="mb-0">Order Summary</h6>
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
                      Rs.{orderSubtotal}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-4">Shipping Charge</th>
                    <td className="py-4 text-end text-muted">Rs.{ship}</td>
                  </tr>
                  <tr>
                    <th className="py-4">Tax (SGST+ CGST)</th>
                    <td className="py-4 text-end text-muted">
                      Rs.{(orderSubtotal / 100) * 18}
                    </td>
                  </tr>
                  <tr>
                    <th className="pt-4 border-0">Total</th>
                    <td className="pt-4 border-0 text-end h3 fw-normal">
                      Rs.{orderSubtotal + ship + (orderSubtotal / 100) * 18}
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
                  <Link to="/">
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
