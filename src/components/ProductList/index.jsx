import React from "react";
import "../ProductList/ProductList.css";
import Products from "../Products";
import { Data } from "../../Data/Data.js";

const ProductList = () => {
  return (
    <div className="ListContainer">
       <div>
        <h1 className="t1">Popular product that we sold</h1>
        <p className="t2">
        We provide best quality & fresh grocery items near your location
        </p>
      </div>
      {Data.map((card, id) => {
        return <Products card={card} id={id} />;
      })}
    </div>
  );
};

export default ProductList;
