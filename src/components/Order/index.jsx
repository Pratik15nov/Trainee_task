import React, { useEffect, useState, useRef } from "react";
import "./Order.css";
import { useReactToPrint } from "react-to-print";
export default function Order() {
  const [cart, setCart] = useState([]);
  console.log(cart, "CONSOLED");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Data")));
  }, []);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="container-fluid invoice" ref={componentRef}>
      <div className="row maincard ">
        <div className="col-12">
          <div className="page-title-box row">
            <div className="page-title-right col">
              Thank you. Your order has been received.
            </div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <button onClick={handlePrint} className="button">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row invoicecard ">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-start mb-3">
                  <h1>ECommerce</h1>
                </div>
                <div className="float-end">
                  <h4 className="m-0 d-print-none">Invoice</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="float-end mt-3">
                    <p>
                      <b>Hello, Cooper Hobson</b>
                    </p>
                    <p className="text-muted font-13">
                      Please find below a cost-breakdown for the recent work
                      completed. Please make payment at your earliest
                      convenience, and do not hesitate to contact me with any
                      questions.
                    </p>
                  </div>
                </div>

                <div className="col-sm-4 offset-sm-2">
                  <div className="mt-3 float-sm-end">
                    <p className="font-13">
                      <strong>Order Date: </strong> &nbsp;&nbsp;&nbsp;
                    </p>
                    <p className="font-13">
                      <strong>Order Status: </strong>
                      <span className="badge bg-success float-end">Paid</span>
                    </p>
                    <p className="font-13">
                      <strong>Order ID: </strong>{" "}
                      <span className="float-end">123456</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-sm-4">
                  <h6>Address</h6>
                  <address></address>
                </div>

                <div className="col-sm-4">
                  <h6>Shipping Address</h6>
                  <address></address>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <table className="table mt-4">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Cost</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <b>Laptop</b> <br />
                            {/* Brand Model VGN-TXN27N/B 11.1" Notebook PC */}
                          </td>
                          <td>1</td>
                          <td>Rs: 00</td>
                          <td className="text-end">Rs : 1799.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="clearfix pt-3">
                    <h6 className="text-muted">Notes:</h6>
                    <small>
                      All accounts are to be paid within 7 days from receipt of
                      invoice.
                    </small>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="float-end mt-3 mt-sm-0">
                    <p>
                      <b>Sub-total:</b>
                      <span className="float-end"></span>
                    </p>
                    <p>
                      <b>Tax(CGST+SGST):</b>
                      <span className="float-end"></span>
                    </p>
                    <p>
                      <b>Shipping Charge: </b>
                      <span className="float-end"></span>
                    </p>
                    <p>
                      <b>Discount: </b>
                      <span className="float-end"></span>
                    </p>
                    <h5>Total Rs: </h5>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
