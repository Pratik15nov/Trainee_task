import React from "react";
import "../ProductList/ProductList.css";
import Products from "../Products";
import { PopularData } from "../../Data/PopularData.js";

const ProductList = () => {
  return (
    <div className="ListContainer">
      <h1 className="header_one">Popular product that we sold</h1>
      <p className="header_two">
        We provide best quality & fresh grocery items near your location
      </p>
      {PopularData.map((card, id) => {
        return <Products card={card} id={id} key={card.id} />;
      })}
    </div>
  );
};

export default ProductList;
