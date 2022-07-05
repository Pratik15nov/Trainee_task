import React from "react";
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
          {alldata.map((card) => {
            return (
              <div className="cardView">
                <img src={card.img} className="card-img-top" alt={card.name} />
                <div className="div1">
                  <h4 style={{ textAlign: "center" }}>{card.name}</h4>
                </div>
                <div className="third_container">
                  <div className="fourth_container">
                    <b>Price: Rs.{card.rate}</b>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;

{
  /* <div className="navbar" onClick={()=>console.log("WORKS")} >
<label for="touch" className="label_nav"  >
  <span>Categorey name</span>
</label>
<input type="checkbox" id="touch" />

<ul class="slide">
  <li>
    <a href="/">Sub category</a>
  </li>
  <li>
    <a href="/">Sub category</a>
  </li>
</ul>
</div> */
}
