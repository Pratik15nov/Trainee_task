import "../ProductList/ProductList.css";
import Products from "../Products";
import { PopularData } from "../../Data/PopularData.js";
import { useState } from "react";
import CartModal from "../cartModalview";


const ProductList = (props) => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [cartdata, setCartdata] = useState([]);
  console.log(setCartdata);

  const parentFunc = () => {
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const takeData = (info) => {
    childata.push(info);
  };
  const cartFunc = (cartinfo) => {
    cartdata.push(cartinfo);
    localStorage.setItem("Data", JSON.stringify(cartdata));
  };

  return (
    <div>
      <div>
        <h1 className="header_one">Popular product that we sold</h1>
        <p className="header_two">
          We provide best quality & fresh grocery items near your location
        </p>
        {PopularData.map((card) => {
          return (
            <Products parentFunc={parentFunc} takeData={takeData} card={card} />
          );
        })}
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
