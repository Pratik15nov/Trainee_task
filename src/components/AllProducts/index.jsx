import React, { useEffect, useState } from "react";
import "../AllProducts/Allproducts.css";
// import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
import { EventEmitter } from "../../utils/helper";
import AllCategories from "../AllCategories";
import { listBody } from "../../utils/helper";
import { productHndlerData } from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Allproducts = (props) => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [productData, setproductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { search } = location;
  useEffect(() => {
    let categoryId;
    if (search.split("=").length > 0) {
      categoryId = search.split("=")[1];
    } else {
      categoryId = "";
    }
    getproductData(categoryId);
    setLoading(false);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const getproductData = async (log = "") => {
    let body;
    if (log.length === 0) {
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
    setproductData(response.data?.data?.list);
    setLoading(false);
  };
  // const fetch = () => {
  //   console.log("location.state", location.state);
  //   if (location.state === null) {
  //     setallData(PopularData);
  //   } else {
  //     switch (location.state.data) {
  //       case "dairy":
  //         setallData(DairyProducts);
  //         break;
  //       case "cloth":
  //         setallData(ClothingWear);
  //         break;
  //       case "foot":
  //         setallData(FootWear);
  //         break;
  //       case "Accessories":
  //         setallData(Accessories);
  //         break;
  //       case "seeall":
  //         setallData(productData);
  //         break;
  //       default:
  //         setallData(productData);
  //     }
  //   }
  // };

  const parentFunc = (card) => {
    setChildata(card);
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const cartFunc = (cartinfo) => {
    setChildata([]);
    const data =
      JSON.parse(localStorage.getItem("Data"))?.filter(
        (oldinfo) => oldinfo.id !== cartinfo.id
      ) || [];
    data.push(cartinfo);
    localStorage.setItem("Data", JSON.stringify(data));
    EventEmitter.dispatch("DATA", data);
  };

  return (
    <div className="row no-gutters datas_container text">
      <div className="col-3 filter_div">
        <AllCategories id={getproductData} />
      </div>
      <div className="col-9 data_div">
        <div className="data_container">
          {productData.length > 0 ? (
            productData.map((card) => {
              return (
                <div className="cardView " key={card.id}>
                  <img
                    src={URL + card.img}
                    className="card-img-top"
                    alt={card.name}
                  />

                  <div className="div1">
                    <p
                      className="font_cardView text
                    "
                    >
                      <b className="text">{card.name}</b>
                      <br />
                      &#x20b9;{card.price}
                    </p>
                  </div>
                  <div className="third_container">
                    <div className="fourth_container">
                      &#x20b9;
                      <del>{card.discountPrice + card.price}</del>
                    </div>
                    <div className="fifth_conatiner">
                      <button
                        className="BuyButton"
                        onClick={(e) => parentFunc(card)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
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

          {show && (
            <CartModal
              childata={childata}
              cartFunc={cartFunc}
              closeHandle={closeHandle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Allproducts;
