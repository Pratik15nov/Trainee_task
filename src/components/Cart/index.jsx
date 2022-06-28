import React, { useState } from "react";

import "./Cart.css";
import { PopularData } from "../../Data/PopularData.js";

export default function Cart() {
  console.log(PopularData);
  const [totalValue,setTotalValue]=useState([]);
  return (
    <>
      <div className="container">
        <div className="mb-5 row">
          <div className="pe-xl-5 col-lg-8 card">
            <div className="cart mb-3">
              <div className="cart-body" />
              <div className="main-content">
                <h4 className="main-heading main">Shopping Cart</h4>
                <div>
                  <p>You have {PopularData.length} items in your cart.</p>
                </div>
              </div>
              <div className="container scroll  mt-5 ">
                <div className="d-flex justify-content-center row">
                  {PopularData.map((card, id) => {
                    return (
                      <div className="col-md-10 main pt-2" key={card.id}>
                        <div className="row  border rounded  ">
                          <div className="col-md-3 mt-1">
                            <img
                              className="img-fluid img-responsive rounded product-image"
                              src={card.img}
                              alt="cardimg"
                            />
                          </div>
                          <div className="col-md-6 mt-3">
                            <h5>{card.name}</h5>
                            <div className="mt-1 mb-1 spec-1">
                              <p>Product id: {card.id}</p>
                              <p>{card.description}</p>
                            </div>
                          </div>
                          <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                            <div className="d-flex flex-row align-items-center mt-2">
                              <h4 className="mr-1">Rs :{card.rate}</h4>
                            </div>
                            <div className="d-flex flex-column mt-3 ">
                              <button className=" dbutton" type="button">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 main">
            <div className="mb-5 card">
              <div className="card-header">
                <h6 className="mb-0">Order Summary</h6>
              </div>
              <div className="py-4 card-body">
                <p className="text-muted text-sm">
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p>
                <table className="table card-text">
                  <tbody>
                    <tr>
                      <th className="py-4">Order Subtotal</th>
                      <td className="py-4 text-end text-muted">
                        
                          <>
                            Rs.
                            {/* {PopularData && PopularData.rate.reduce((acc, curr) => console.log("acc",acc,curr))} */}
                          </>
                       
                      </td>
                    </tr>
                    <tr>
                      <th className="py-4">Shipping</th>
                      <td className="py-4 text-end text-muted">
                        {/* */}Rs.{/* */}10.00
                      </td>
                    </tr>
                    <tr>
                      <th className="py-4">Tax</th>
                      <td className="py-4 text-end text-muted">Rs. 0.00</td>
                    </tr>
                    <tr>
                      <th className="pt-4 border-0">Total</th>
                      <td className="pt-4 border-0 text-end h3 fw-normal">
                        Rs.10.00
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
                    <a
                      role="button"
                      tabIndex={0}
                      href="/checkout1"
                      className="button"
                    >
                      Proceed to Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
