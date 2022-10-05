import React, { useEffect, useState } from "react";
import "../AllCategories/AllCategories.css";
import { listBody, URL } from "../../utils/helper";
import { categoryHndlerData } from "../../service/auth.service";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

const AllCategories = (props) => {
  const location = useLocation();
  const [categoriesData, setcategoriesData] = useState([]);
  const [uid, setuid] = useState(undefined);
  const { search } = location;

  useEffect(() => {
    getcategoryData();
  }, []);
  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
      setuid(userId);
      console.log(userId);
    } else {
      console.log(userId);
      setuid(null);
    }

    // setCart(JSON.parse(localStorage.getItem("Data")) || []);
  }, [search]);

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response);
  };

  const handleClick = (id) => {
    props.id(id);
    setuid(id);
  };

  return (
    <div className="scroll_filter">
      {categoriesData.length > 0 && (
        <>
          <div className="sidebar">
            <span>Shop by category</span>
          </div>
          <div
            className={
              uid !== undefined ? "sidenavbar" : "sidenavbar sidenavbarafter"
            }
            onClick={() => handleClick(undefined)}
          >
            <label htmlFor="touch" className="label_nav">
              <span className="categoryList">
                <img
                  className="imgcategory"
                  src="/images/allproduct.png"
                  alt="img"
                ></img>
                <div className="text textCard">All Products</div>
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
              className={
                uid === card._id ? "sidenavbar sidenavbarafter" : "sidenavbar"
              }
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
                  <div className="text textCard"> {card.categoryName}</div>
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
