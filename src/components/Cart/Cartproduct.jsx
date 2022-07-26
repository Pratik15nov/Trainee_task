import React from "react";
import "./Cart.css";
import { URL } from "../../utils/helper";

const Cartproduct = (props) => {
  return (
    <div className="col-md-10 main pt-2" key={props.card.id}>
      <div className="row border rounded">
        <div className="col-md-3 mt-1">
          <img
            className="img-fluid img-responsive rounded product-image"
            src={URL + props.card.img}
            alt="cardimg"
          />
        </div>
        <div className="col-md-6 mt-3">
          <h5>Product Name: {props.card.name}</h5>

          <p>Product Quantity : {props.card.quantity}</p>
          <p>Specification: {props.card.specification}</p>
        </div>
        <div className="align-items-center align-content-center col-md-3 border-left mt-1">
          <div className="d-flex flex-row align-items-center mt-2 text">
            <h4 className="mr-1">&#x20b9; {props.card.price}</h4>
            <p className="mr-1">
              &#x20b9;<del>{props.card.price}</del>
            </p>
          </div>
          <div className="d-flex flex-column mt-3 ">
            <button
              className="dbutton"
              type="button"
              onClick={() => props.onDelete(props.card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cartproduct;
