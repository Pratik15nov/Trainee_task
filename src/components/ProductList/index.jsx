import React from "react";
import "../ProductList/ProductList.css";
import Products from "../Products";
import { Data } from "../../Data/Data.js";

const ProductList = () => {
  return (
    <div className="ListContainer">
      {Data.map((card, id) => {
        return <Products card={card} id={id} />;
      })}
    </div>
  );
};

export default ProductList;
