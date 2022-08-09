import React from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { orderListDataHandler } from "../../service/auth.service";
import { useEffect } from "react";
import { listBody } from "../../utils/helper";
export default function Order() {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    orderListHandler();
  }, []);
  const orderListHandler = async (pId) => {
    const response = await orderListDataHandler(
      listBody({ where: { isActive: true } })
    );
    console.log(response);
    if (response) {
      setOrderList(response);
    }
  };
  console.log(orderList);
  return (
    <div className="container-fluid text">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <Link to="/"> Home</Link>
                </li>

                <li className="breadcrumb-item active">Orders</li>
              </ol>
            </div>
            <h4 className="page-title text">Orders</h4>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-centered table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Payment Status</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th>Order Status</th>
                      <th style={{ width: 125 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map((card) => {
                      return (
                        <tr>
                          <td>
                            <a
                              href="apps-ecommerce-orders-details.html"
                              className="text-body fw-bold"
                            >
                              {card.paymentId.substring(4, 14)}
                            </a>
                          </td>
                          <td>
                            August 05 2018{" "}
                            <small className="text-muted">10:29 PM</small>
                          </td>
                          <td>
                            <h5>
                              <span className="badge badge-success-lighten">
                                <i className="mdi mdi-bitcoin" /> Paid
                              </span>
                            </h5>
                          </td>
                          <td>$176.41</td>
                          <td>Mastercard</td>
                          <td>
                            <h5>
                              <span className="badge badge-info-lighten">
                                Shipped
                              </span>
                            </h5>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0);"
                              className="action-icon"
                            >
                              <i className="mdi mdi-eye" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="action-icon"
                            >
                              <i className="mdi mdi-square-edit-outline" />
                            </a>
                            <a
                              href="javascript:void(0);"
                              className="action-icon"
                            >
                              <i className="mdi mdi-delete" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
