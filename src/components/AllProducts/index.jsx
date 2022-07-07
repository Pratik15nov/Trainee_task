import React, { useEffect } from "react";
import "../AllProducts/Allproducts.css";
import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
import { useState } from "react";
import { EventEmitter } from "../../utils/helper";
import AllCategories from "../AllCategories";

const Allproducts = (props) => {
  const [alldata, setallData] = useState(PopularData);
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);

  EventEmitter.subscribe("PopularData", (res) => {
    setallData(res);
    console.log(res, "RES");
    console.log(alldata, "CHECK");
  });

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
    EventEmitter.dispatch("DATA", data);
  };

  const filterData = (log) => {
    setallData(log);
  };

  return (
    <div class="row no-gutters data_container">
      <div class="col-3 filter_div">
        <AllCategories filterData={filterData} />
      </div>
      <div class="col-9 data_div">
        <div className="data_container scroll_products">
          {/*alldata.map()... */}
          {alldata.map((card) => {
            return (
              <div className="cardView">
                <img src={card.img} className="card-img-top" alt={card.name} />
                <div className="div1">
                  {/* <h4 style={{ textAlign: "center" }}>{card.name}</h4> */}
                  <p className="font_cardView">
                    <b>{card.name}</b>
                  </p>
                </div>
                <div className="third_container">
                  <div className="fourth_container">
                    <b>Price: Rs.{card.rate}</b>
                  </div>
                  <div className="fifth_conatiner">
                    <button
                      className="BuyButton"
                      // className="button "
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
    </div>
  );
};

export default Allproducts;
