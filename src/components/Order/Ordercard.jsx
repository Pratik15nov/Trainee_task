import React from "react";
import { URL } from "../../utils/helper";
const Ordercard = (props) => {
  return (
    <div className="ordercard-main">
      <div className="row ordercard">
        <div className="col-sm-3">
          Order: {props.card.orderStatus}
          <br />
          Date: {props.card.createdAt.substring(0, 10)}
        </div>
        <div className="col-sm-2">
          Total: {props.card.productId.price * props.card.productId.quantity}
          <br />
        </div>
        <div className="col-sm-4">
          Ship to: {props.card.addressId.address_1}
          <br />
          {props.card.addressId.address_2},{props.card.addressId.pincode}
        </div>
        <div className="col-sm-3">
          Order id: #{props.card._id.substring(0, 8)}
          <br />
          <button
            className="button-download"
            onClick={() => props.invoiceDataHandler(props.card.paymentId)}
          >
            {!props.loading ? (
              "Download Invoice"
            ) : (
              <div class="spinner-border spinner-border-sm"></div>
            )}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-7">
          <div className="row">
            <div className="ordercard-h1">
              Deliver May 1,2022
              <br />
              Your Package was left by {props.card.addressId.address_2}
            </div>
            <div className="col-5">
              <img src={URL + props.card.productId.img} alt="orderimg"/>{" "}
            </div>
            <div className="col-7 card-content">
              <h5 className="text ">{props.card.productId.name}</h5>
              <p className="textcard">
                Specification: {props.card.productId.specification}{" "}
              </p>
              <p className="textcard">
                Quantity: {props.card.productId.quantity}{" "}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="col-4 card-button">
          <button className="button-orders-track">
            <Link to="/" className="button-link-text">
              View Your Product
            </Link>
          </button>
        </div> */}
        <div className="col-5 card-button">
          <div className="row d-flex justify-content-center">
            <div className="col-12">
              <ul id="progressbar" className="text-center">
                <li className="active step0" />
                <li className="step0" />
                <li className="step0" />
                <li className="step0" />
              </ul>
            </div>
          </div>
          <div className="row justify-content-between tracking-main">
            <div className="row col d-flex icon-content">
              <img className="icon" src="https://i.imgur.com/9nnc9Et.png" alt="orderimg" />
              <div className="d-flex flex-column">
                <p className="font-weight-bold">
                  Order
                  <br />
                  Placed
                </p>
              </div>
            </div>
            <div className="row col d-flex icon-content">
              <img className="icon" src="https://i.imgur.com/u1AzR7w.png"  alt="orderimg"/>
              <div className="d-flex flex-column">
                <p className="font-weight-bold">
                  Order
                  <br />
                  Shipped
                </p>
              </div>
            </div>
            <div className="row col d-flex icon-content">
              <img className="icon" src="https://i.imgur.com/TkPm63y.png" alt="orderimg" />
              <div className="d-flex flex-column">
                <p className="font-weight-bold">
                  Order
                  <br />
                  En Route
                </p>
              </div>
            </div>
            <div className="row col d-flex icon-content">
              <img className="icon" src="https://i.imgur.com/HdsziHP.png" alt="orderimg"/>
              <div className="d-flex flex-column">
                <p className="font-weight-bold">
                  Order
                  <br />
                  Arrived
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ordercard;
