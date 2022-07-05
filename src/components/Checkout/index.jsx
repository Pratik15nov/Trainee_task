import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Link } from "react-router-dom";
// import { EventEmitter } from "../../utils/helper";
export default function Checkout() {
    const [cart, setCart] = useState([]);
    useEffect(() => {
      setCart(JSON.parse(localStorage.getItem("Data")));
    }, []);
  
    const orderSubtotal = Object.values(cart).reduce(
      (r, { rate }) => r + rate,
      0
    );
    // const handleDelete = (itemId) => {
    //   const items = cart.filter((item) => item.id !== itemId);
    //   setCart(items);
    //   localStorage.setItem("Data", JSON.stringify(items));
    //   console.log(itemId);
    //   EventEmitter.dispatch("DELETE", items);
    // };
  
    // const orderGreaterTehnZero = () => {
    //   return orderSubtotal > 0;
    // };
  
    
  

  return (
    <div className="container">
      <div className="row main">
        <div className="col-lg-7 Checkcard">
          <h4 className="main-heading main">Billing Address</h4>
          <form className="needs-validation">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Last name"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address "
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country">
                  <option value>Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state">
                  <option value>Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder
                />
                <div className="invalid-feedback">Zip code .</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />
            <h4 className="mb-3 ">Payment</h4>
            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  defaultChecked
                />
                <label className="custom-control-label" htmlFor="credit">
                  Credit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="debit">
                  Debit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder
                />
                <div className="invalid-feedback">Credit card number is</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder
                />
                <div className="invalid-feedback">Expiration date </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder
                />
                <div className="invalid-feedback">Security code </div>
              </div>
            </div>
            <hr className="mb-4" />
            <Link to="/Checkout">
              <button className="button">Place Order</button>
            </Link>
          </form>
        </div>
        <div className="col-lg-4 Checkcard">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Cart Summary</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Total of Products</h6>
              </div>
              <span className="text-muted">Rs: {orderSubtotal}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tax (SGST+ CGST)</h6>
              </div>
              <span className="text-muted">
                Rs: {(orderSubtotal / 100) * 18}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Shipping Charge</h6>
              </div>
              <span className="text-muted">Rs: {orderSubtotal > 500 ? "0" : "40"}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span className="text-success">Rs : 00 </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>
                Rs.{orderSubtotal > 500
                        ? orderSubtotal + (orderSubtotal / 100) * 18
                        : orderSubtotal + 40 + (orderSubtotal / 100) * 18}
              </strong>
            </li>
          </ul>
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
