import React, { useEffect, useState } from "react";
import "../AllProducts/Allproducts.css";
// import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
// import { EventEmitter } from "../../utils/helper";
import AllCategories from "../AllCategories";
import { listBody } from "../../utils/helper";
import {
  productHndlerData,
  addcartHndlerData,
  orderListDataHandler,
} from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import AllproductSkeleton from "./AllproductSkeleton";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { fetchCartList } from "../../js/actions";
import { useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton";

const Allproducts = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [productData, setProductData] = useState([]);
  // console.log("UPDATED", productData);
  const [loading, setLoading] = useState(true);
  const [dataNotFound, setDataNotFound] = useState(false);
  const location = useLocation();
  const { search } = location;
  const [userData, setuserData] = useState([]);
  const [index, setIndex] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let categoryId;
    let filter;
    let from;
    let to;
    // console.log(search.split("=")[1].substring(4));
    if (search.includes("cid")) {
      categoryId = search.split("=")[1];
      setIndex(categoryId);
    } else if (search.includes("filter")) {
      if (search.includes("From")) {
        console.log("done");
        from = search.split("From")[1]?.split("To")[0];
        to = search.split("From")[1]?.split("To")[1];
        filter = "From";
      } else {
        filter = search.split("=")[1];
      }

      console.log(from, to);
      setIndex(filter);
    } else {
      setIndex("ALL");
    }
    getproductData(filter, categoryId, from, to);
    setuserData(JSON.parse(localStorage.getItem("userData")) || []);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChnageIndex = (i) => {
    setIndex(i);
    switch (i) {
      case "ALL":
        navigate(`/products`);
        break;
      case "Popularity":
        navigate(`/products?filter=Popularity`);
        getproductData("Popularity");
        break;
      case "NewestFirst":
        navigate(`/products?filter=NewestFirst`);
        getproductData("NewestFirst");
        break;
      case "LowToHigh":
        navigate(`/products?filter=LowToHigh`);
        getproductData("LowToHigh");
        break;
      case "HighToLow":
        navigate(`/products?filter=HighToLow`);
        getproductData("HighToLow");
        break;
      default:
        navigate(`/products`);
    }
  };
  const getproductData = async (filter, log = "", from, to) => {
    console.log(filter, log, from, to);
    setProductData([]);
    setLoading(true);
    let body;

    if (filter) {
      body = listBody({
        where: {
          isActive: true,
        },
        perPage: 1000,
      });
    } else if (!log) {
      body = listBody({
        where: {
          isActive: true,
        },
        perPage: 1000,
      });
    } else {
      body = listBody({
        where: {
          isActive: true,
          categoryId: log,
        },
        perPage: 1000,
      });
    }
    const response = await productHndlerData(body);
    if (response.length > 0) {
      setDataNotFound(false);
      setLoading(false);
    } else {
      setDataNotFound(true);
    }
    switch (filter) {
      case "LowToHigh":
        setProductData(
          response?.sort(function (a, b) {
            return parseFloat(a.discountPrice) - parseFloat(b.discountPrice);
          })
        );
        break;
      case "HighToLow":
        setProductData(
          response.sort(function (a, b) {
            return parseFloat(b.discountPrice) - parseFloat(a.discountPrice);
          })
        );
        break;
      case "NewestFirst":
        setProductData(response);
        break;
      case "Popularity":
        setLoading(true);
        const responses = await orderListDataHandler(
          listBody({
            where: {
              isActive: true,
            },
          })
        );
        if (responses) {
          const updatedList = [];
          responses.filter((res) => {
            res.cartdetail.filter((res1) => {
              updatedList.push({
                id: res1?.productId?._id,
                qua: res1?.quantity,
              });
            });
          });
          var filterMap = {};
          updatedList.forEach(function (item) {
            if (!filterMap[item.id] || filterMap[item.id].qua < item.qua) {
              filterMap[item.id] = item;
            }
          });
          var result = [];
          for (var id in filterMap) {
            result.push(filterMap[id]);
          }
          result.sort(function (a, b) {
            return b.qua - a.qua;
          });
          var output = [];
          result.forEach((item) => {
            const match = response.find((item2) => item.id === item2._id);
            if (match) {
              output.push({ ...item, ...match });
            }
          });
          setProductData(output);
        } else {
          setProductData([]);
        }

        break;
      case "InStock":
        var newArray = response.filter(function (obj) {
          return obj.quantity > 0;
        });
        setProductData(newArray);
        break;
      case "From":
        let newData = response.filter(function (obj) {
          return obj.discountPrice >= from && obj.discountPrice <= to;
        });
        var result = [];
        for (var discountPrice in newData) {
          result.push(newData[discountPrice]);
        }
        result.sort(function (a, b) {
          return a.discountPrice - b.discountPrice;
        });

        if (result.length > 0) {
          setProductData(result);
        } else {
          setDataNotFound(true);
        }
        console.log(result);
        break;
      default:
        setProductData(response);
    }
  };

  const parentFunc = (card) => {
    setChildata(card);
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const cartFunc = async (cartdata) => {
    setChildata([]);

    const body = {
      userId: cartdata.userId,
      productId: cartdata.productId,
      quantity: cartdata.quantity,
    };
    // localStorage.setItem("Data", JSON.stringify(cartdata));
    // eslint-disable-next-line
    const response = await addcartHndlerData(body); // eslint-disable-next-line
    dispatch(fetchCartList(listBody({ where: { userId: cartdata.userId } })));
    // EventEmitter.dispatch("DATA", body.quantity.length);
    // console.log(cartdata);
  };

  return (
    <div className="row no-gutters datas_container text">
      <div className="col-3 filter_div">
        <AllCategories id={getproductData} />
      </div>
      <div className="col-9 data_div">
        <div className="data_container">
          <div className="sortby">
            Sort By :
            <span
              className={index === "ALL" ? "sortbyspan" : "sortbynone"}
              onClick={() => onChnageIndex("ALL")}
            >
              All Products
            </span>
            <span
              className={index === "Popularity" ? "sortbyspan" : "sortbynone"}
              onClick={() => onChnageIndex("Popularity")}
            >
              Popularity
            </span>
            <span
              className={index === "NewestFirst" ? "sortbyspan" : "sortbynone"}
              onClick={() => onChnageIndex("NewestFirst")}
            >
              Newest First
            </span>
            <span
              className={index === "LowToHigh" ? "sortbyspan" : "sortbynone"}
              onClick={() => onChnageIndex("LowToHigh")}
            >
              Price - Low to High
            </span>
            <span
              className={index === "HighToLow" ? "sortbyspan" : "sortbynone"}
              onClick={() => onChnageIndex("HighToLow")}
            >
              Price - High to Low
            </span>
            <span className="productLength">
              Showing {productData.length} results
            </span>
          </div>
          {productData.length > 0 &&
            productData.map((card) => {
              return (
                <div className="cardView ">
                  {card.quantity > 10 ? (
                    <span class=" text instock">In Stock</span>
                  ) : (
                    <></>
                  )}
                  {card.quantity < 11 && card.quantity > 0 ? (
                    <span class=" text lowstock">Selling fast!</span>
                  ) : (
                    <></>
                  )}
                  {card.quantity === 0 ? (
                    <span class=" text outofstock">Out of Stock</span>
                  ) : (
                    <></>
                  )}
                  <img
                    src={URL + card.img}
                    className="card-img-top"
                    alt={card.name}
                  />

                  <div className="div1">
                    <p className="font_cardView text">
                      <b className="text">{card.name}</b>
                      <br />
                      &#x20b9;{card.discountPrice}
                    </p>
                  </div>
                  <div className="third_container">
                    <div className="fourth_container">
                      &#x20b9;
                      <del>{card.price}</del>
                    </div>
                    <div className="fifth_conatiner">
                      {card.quantity === 0 ? (
                        <div className="fourth_container">Out Of Stock</div>
                      ) : (
                        <button
                          className="BuyButton"
                          onClick={(e) => parentFunc(card)}
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {dataNotFound && (
            <div className="col-md-12 main pt-5">
              <img
                src="/images/noproduct.png"
                className=" mx-auto d-block"
                alt="..."
              />
              <p className="header_one">No Products Found!</p>
              {/* <p className="header_two">Please add product to your cart list</p> */}
            </div>
          )}
          {/* {!dataNotFound && loading && ( */}
          <>
            <Box>
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
              <AllproductSkeleton />
            </Box>
          </>
          {/* )} */}

          {show && (
            <CartModal
              childata={childata}
              cartFunc={cartFunc}
              closeHandle={closeHandle}
              userData={userData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;
