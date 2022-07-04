import React from "react";
import "../AllProducts/Allproducts.css";
import { PopularData } from "../../Data/PopularData";
import Navbar from "../Navbar";
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
      <div>
        <Navbar />
      </div>
      <div>
        {PopularData.map((card) => {
          return (
            <div className="cardView">
              <img src={card.img} className="card-img-top" alt={card.name} />
              <div className="div1">
                <h4 style={{ textAlign: "center" }}>{card.name}</h4>
              </div>
              <div className="div3">
                <div className="div4">
                  <b>Price: ${card.rate}</b>
                </div>
                <div className="div5">
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
        )}
      </div>
    </div>
  );
};

export default Allproducts;
