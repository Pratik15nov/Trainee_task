import React, { useEffect } from "react";
import "../AllProducts/Allproducts.css";
import { PopularData } from "../../Data/PopularData";
import CartModal from "../cartModalview";
import { useState } from "react";
import { EventEmitter } from "../../utils/helper";
import AllCategories from "../AllCategories";
import { useLocation } from "react-router-dom";
import { DairyProducts } from "../../Data/DairyProductsData";
import { ClothingWear } from "../../Data/ClothingWearData";
import { FootWear } from "../../Data/FootWearData";
import { Accessories } from "../../Data/AccessoriesData";

const Allproducts = (props) => {
  const [alldata, setallData] = useState(PopularData);
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch();
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetch = () => {
    console.log("count");
    console.log("location.state", location.state);
    if (location.state === null) {
      setallData(PopularData);
    } else {
      switch (location.state.data) {
        case "dairy":
          setallData(DairyProducts);
          break;
        case "cloth":
          setallData(ClothingWear);
          break;
        case "foot":
          setallData(FootWear);
          break;
        case "Accessories":
          setallData(Accessories);
          break;
        case "seeall":
          setallData(PopularData);
          break;
        default:
          setallData(PopularData);
      }
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

  const filterData = (log) => {
    setallData(log);
  };

  return (
    <div className="row no-gutters data_container">
      <div className="col-3 filter_div">
        <AllCategories filterData={filterData} />
      </div>
      <div className="col-9 data_div">
        <div className="data_container scroll_products">
          {alldata.length > 0 &&
            alldata?.map((card) => {
              return (
                <div className="cardView" key={card.id}>
                  <img
                    src={card.img}
                    className="card-img-top"
                    alt={card.name}
                  />
                  <div className="div1">
                    <p className="font_cardView">
                      <b>{card.name}</b>
                    </p>
                  </div>
                  <div className="third_container">
                    <div className="fourth_container">
                      <b>Price: Rs.{card.rate}</b>
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
            })}
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
