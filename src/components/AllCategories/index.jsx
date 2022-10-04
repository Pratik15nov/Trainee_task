import React, { useEffect, useState } from "react";
import "../AllCategories/AllCategories.css";
import { ENDPOINTURL, listBody, URL } from "../../utils/helper";
import { categoryHndlerData } from "../../service/auth.service";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const AllCategories = (props) => {
  const [categoriesData, setcategoriesData] = useState([]);

  useEffect(() => {
    getcategoryData();
  }, []);

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response);
  };

  const handleClick = (id) => {
    props.id(id);
  };

  return (
    <div className="scroll_filter">
      {categoriesData.length > 0 && (
        <>
          <div className="sidebar">
            <span>Shop by category</span>
          </div>
          <div
            className="sidenavbar sideBarHeader"
            onClick={() => handleClick("")}
          >
            <label htmlFor="touch" className="label_nav">
              <span className="categoryList">
                <img
                  className="imgcategory"
                  src="/images/allproduct.png"
                ></img>
                <>All Products</>
              </span>
            </label>
            <label htmlFor="touch" className="categoryList"></label>
          </div>
        </>
      )}
      {categoriesData.length > 0 &&
        categoriesData.map((card, index) => {
          return (
            <div
              className="sidenavbar"
              id={card._id}
              key={`categories_${index}}`}
              onClick={() => handleClick(card._id)}
            >
              <label htmlFor="touch" className="label_nav">
                <span className="categoryList">
                  <img
                    className="imgcategory"
                    src={URL + card.categoryImg}
                    alt={card.categoryName}
                  ></img>
                  <> {card.categoryName}</>
                </span>
              </label>
            </div>
          );
        })}
      {categoriesData.length === 0 && (
        <Box className="skeleton_box">
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            className="skeleton"
            height={42}
            animation="wave"
          />
        </Box>
      )}
    </div>
  );
};
export default AllCategories;
