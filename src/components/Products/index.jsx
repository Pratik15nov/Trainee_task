import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "../Products/product.css";
const Products = (props) => {
  const [num, setNum] = useState(0);
  const [rate, setRate] = useState(props.card.rate);
  

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
    <div>
      <div className="cardConatiner">
        <div className="cardView">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={props.card.img}
              className="card-img-top imageClass"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{props.card.name}</h5>
              <h5> <p>Price: {''} ${rate}</p></h5>

              <p className="card-text">{props.card.description}</p>

             
             
              <button className="btn BTS">Buy Now</button>

              <div class="container  Counter ">
                <div class=" row float-left ">
                <div class="col-sm">
                    <h6><p>Quantity:</p></h6>
                  </div>
                  <div class="col-sm">
                   <h5> <p onChange={handleChange}> {num} </p></h5>
                  </div>
                  <div class="col-sm">
                  <button
                      className="btn  btn-sm BTS"
                      onClick={incNum}
                    >
                      +
                    </button>
                   
                  </div>
                  <div class="col-sm">
                    
                    <button
                      className="btn  btn-sm  BTS"
                      onClick={decNum}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="card-body">
                  <p>{card.rate}</p>
                  <button className="btn btn-success">ADD TO CART </button>
                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
