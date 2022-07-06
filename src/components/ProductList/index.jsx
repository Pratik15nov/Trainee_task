import "../ProductList/ProductList.css";
import Products from "../Products";
import { PopularData } from "../../Data/PopularData.js";
import { useState } from "react";
import CartModal from "../cartModalview";
import SeeMore from "../SeemoreCard";
import { EventEmitter } from "../../utils/helper";
const ProductList = (props) => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);

  const parentFunc = () => {
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const takeData = (info) => {
    setChildata(info);
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

  return (
    <div>
      <div>
        <h1 className="header_one">Popular product that we sold</h1>
        <p className="header_two">
          We provide best quality & fresh grocery items near your location
        </p>
        <div>
          {PopularData.slice(0, 5).map((card) => {
            return (
              <Products
                parentFunc={parentFunc}
                takeData={takeData}
                card={card}
                key={card.id}
              />
            );
          })}
        </div>
        <div>
          <SeeMore />
        </div>
      </div>
      {show && (
        <CartModal
          childata={childata}
          cartFunc={cartFunc}
          closeHandle={closeHandle}
        />
      )}
    </div>
  );
};

export default ProductList;
