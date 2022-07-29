import React, { useEffect, useState } from "react";
import "../AllCategories/AllCategories.css";
import { listBody } from "../../utils/helper";
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
    setcategoriesData(response.data?.data?.list);
  };

  const handleClick = (id) => {
    props.id(id);
  };

  return (
    <div className="scroll_filter scroll">
      {categoriesData.length > 0 && (
        <div>
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
        </div>
      )}
      {categoriesData.length > 0 &&
        categoriesData.map((card) => {
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
