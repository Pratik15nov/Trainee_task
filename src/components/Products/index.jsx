import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "../Products/product.css";
const Products = (props) => {
  const [num, setNum] = useState(0);
  // eslint-disable-next-line
  const [rate, setRate] = useState(props.card.rate);

  // console.log(setRate);

  const incNum = () => {
    setNum(Number(num) + 1);
  };
  const decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <div className="cardView">
      <img src={props.card.img} className="card-img-top" alt="..." />

      <div className="div1">
        <h4 style={{ textAlign: "center" }}>{props.card.name}</h4>
      </div>
      <div className="d-flex justify-content-center">
        <button className="CounterButton" onClick={incNum}>
          +
        </button>
        <b style={{ margin: "2%" }} onChange={handleChange}>
          {num}
        </b>
        <button className="CounterButton" onClick={decNum}>
          -
        </button>
      </div>

      <div className="div3">
        <div className="div4">
          <b>
            {" "}
            Price:{""} ${rate}
          </b>
        </div>
        <div className="div5">
          <button className="BuyButton">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
