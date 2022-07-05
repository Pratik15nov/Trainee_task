import React from "react";
import "../AllCategories/AllCategories.css";
import { PopularData } from "../../Data/PopularData";
import { DairyProducts } from "../../Data/DairyProductsData";
import { FootWear } from "../../Data/FootWearData";
import { ClothingWear } from "../../Data/ClothingWearData";
import { Accessories } from "../../Data/AccessoriesData";

const AllCategories = (props) => {
  return (
    <div className="scroll_filter">
      <div className="navbar" onClick={() => props.filterData(PopularData)}>
        <label for="touch" className="label_nav">
          <span>All Products</span>
        </label>
      </div>
      <div className="navbar" onClick={() => props.filterData(DairyProducts)}>
        <label for="touch" className="label_nav">
          <span>Dairy Items</span>
        </label>
      </div>
      <div className="navbar" onClick={() => props.filterData(ClothingWear)}>
        <label for="touch" className="label_nav">
          <span>Clothing wear</span>
        </label>
      </div>
      <div className="navbar" onClick={() => props.filterData(FootWear)}>
        <label for="touch" className="label_nav">
          <span>FootWears</span>
        </label>
      </div>
      <div className="navbar" onClick={() => props.filterData(Accessories)}>
        <label for="touch" className="label_nav">
          <span>Accessories</span>
        </label>
      </div>
    </div>
  );
};
export default AllCategories;
