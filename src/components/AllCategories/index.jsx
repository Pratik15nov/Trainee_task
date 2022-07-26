import React, { useEffect, useState } from "react";
import "../AllCategories/AllCategories.css";
// import { PopularData } from "../../Data/PopularData";
// import { DairyProducts } from "../../Data/DairyProductsData";
// import { FootWear } from "../../Data/FootWearData";
// import { ClothingWear } from "../../Data/ClothingWearData";
// import { Accessories } from "../../Data/AccessoriesData";
import { listBody } from "../../utils/helper";
import { categoryHndlerData } from "../../service/auth.service";

const AllCategories = (props) => {
  const [categoriesData, setcategoriesData] = useState([]);

  useEffect(() => {
    getcategoryData();
  }, []);

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response.data?.data?.list);
  };

  const handleClick = (id) => {
    props.id(id);
  };

  return (
    // <div className="scroll_filter">
    //   <div className="sidenavbar" onClick={() => props.filterData(PopularData)}>
    //     <label htmlFor="touch" className="label_nav">
    //       <span>All Products</span>
    //     </label>
    //   </div>
    //   <div className="sidenavbar" onClick={() => props.filterData(DairyProducts)}>
    //     <label htmlFor="touch" className="label_nav">
    //       <span>Dairy Items</span>
    //     </label>
    //   </div>
    //   <div className="sidenavbar" onClick={() => props.filterData(ClothingWear)}>
    //     <label htmlFor="touch" className="label_nav">
    //       <span>Clothing wear</span>
    //     </label>
    //   </div>
    //   <div className="sidenavbar" onClick={() => props.filterData(FootWear)}>
    //     <label htmlFor="touch" className="label_nav">
    //       <span>FootWears</span>
    //     </label>
    //   </div>
    //   <div className="sidenavbar" onClick={() => props.filterData(Accessories)}>
    //     <label htmlFor="touch" className="label_nav">
    //       <span>Accessories</span>
    //     </label>
    //   </div>
    // </div>
    <div className="scroll_filter scroll">
      <div className="sidenavbar">
        <label className="label_nav ">
          <span>Shop by category</span>
        </label>
      </div>
      <div className="sidenavbar" onClick={() => handleClick("")}>
        <label htmlFor="touch" className="label_nav">
          <span>All Products</span>
        </label>
      </div>
      {categoriesData.map((card) => {
        return (
          <div
            className="sidenavbar"
            id={card._id}
            onClick={() => handleClick(card._id)}
          >
            <label htmlFor="touch" className="label_nav">
              <span>{card.categoryName}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};
export default AllCategories;
