import React, { useRef } from "react";
import "./Order.css";
import { useReactToPrint } from "react-to-print";
export default function Order() {
  // eslint-disable-next-line
  const invoiceData = JSON.parse(localStorage.getItem("Data"));
  console.log(invoiceData);
  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="container-fluid invoice">
      <div className="row maincard ">
        <div className="col-12">
          <div className="page-title-box row">
            <div className="page-title-right col Sstyle">
              Thank you. Your order has been received.
            </div>
            <div className="col"></div>
            {/* <div className="col"></div> */}
            {/* <div className="col"></div> */}
            <div className="col">
              <button onClick={handlePrint} className="button">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row invoicecard " ref={componentRef}>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-start mb-3">
                  <h1>eCommerce</h1>
                </div>
                <div className="float-end">
                  <h4 className="m-0 d-print-none">Invoice</h4>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="float-end mt-3">
                    <p>
                      <b>
                        Hello,{JSON.parse(localStorage.getItem("First Name"))}
                        {JSON.parse(localStorage.getItem("Last Name"))}
                      </b>
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
                      <strong>Order Date:{JSON.parse(localStorage.getItem("OrderDate"))} </strong> &nbsp;&nbsp;&nbsp;
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
                  <address>
                    {JSON.parse(localStorage.getItem("Address"))}
                  </address>
                </div>

                <div className="col-sm-4">
                  <h6>Shipping Address</h6>
                  <address>
                    {JSON.parse(localStorage.getItem("Address2"))}
                  </address>
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
                        {invoiceData.map((data, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <b>{data.name}</b> <br />
                              </td>
                              <td>{data.quantity}</td>
                              <td>Rs: {data.rate/data.quantity}</td>
                              <td className="text-end">Rs : {data.rate}</td>
                            </tr>
                          );
                        })}
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
                      <span className="float-end">
                        {JSON.parse(localStorage.getItem("Order Total"))}
                      </span>
                    </p>
                    <p>
                      <b>Tax(CGST+SGST):</b>
                      <span className="float-end">
                        {JSON.parse(localStorage.getItem("Tax"))}
                      </span>
                    </p>
                    <p>
                      <b>Shipping Charge: </b>
                      <span className="float-end">
                        {JSON.parse(localStorage.getItem("Shipping Charge"))}
                      </span>
                    </p>
                    <p>
                      <b>Discount: </b>
                      <span className="float-end">
                        {JSON.parse(localStorage.getItem("Discount"))}
                      </span>
                    </p>
                    <p>
                      <b>Total Rs: </b>
                      <span className="float-end">
                        {JSON.parse(localStorage.getItem("Total"))}
                      </span>
                    </p>
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
