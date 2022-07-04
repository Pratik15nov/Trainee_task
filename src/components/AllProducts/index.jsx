import React from "react";
import "../AllProducts/Allproducts.css";
import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
import { useState } from "react";

const Allproducts = () => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const parentFunc = (card) => {
    setChildata(card);
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const cartFunc = (cartinfo) => {
    setChildata([]);
    const data =
      JSON.parse(localStorage.getItem("Data"))?.filter(
        (oldinfo) => oldinfo.id !== cartinfo.id
      ) || [];
    data.push(cartinfo);
    localStorage.setItem("Data", JSON.stringify(data));
  };

  return (
    <div>
      <div class="row no-gutters data_container">
        <div class="col-6 col-md-4">FILTER</div>
        <div class="col-12 col-sm-6 col-md-8">{PopularData.map((card) => {
          return (
            <div className="cardView">
              <img src={card.img} className="card-img-top" alt={card.name} />
              <div className="div1">
                <h4 style={{ textAlign: "center" }}>{card.name}</h4>
              </div>
              <div className="third_container">
                <div className="fourth_container">
                  <b>Price: ${card.rate}</b>
                </div>
                <div className="fifth_conatiner">
                  <button
                    className="BuyButton"
                    onClick={(e) => parentFunc(card)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {show && (
          <CartModal
            childata={childata}
            cartFunc={cartFunc}
            closeHandle={closeHandle}
          />
        )}</div>
      </div>
      {/* <div className="data_container">
        
      </div> */}
    </div>
  );
};

export default Allproducts;
