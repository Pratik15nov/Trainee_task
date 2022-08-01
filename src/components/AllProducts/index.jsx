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
} from "../../service/auth.service";
import { URL } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import AllproductSkeleton from "./AllproductSkeleton";
import Box from "@mui/material/Box";

const Allproducts = (props) => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [productData, setproductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataNotFound, setDataNotFound] = useState(false);
  const location = useLocation();
  const { search } = location;
  const [userData, setuserData] = useState([]);
  // const [selected, setSelected] = useState(false);
  useEffect(() => {
    let categoryId;
    if (search.split("=").length > 0) {
      categoryId = search.split("=")[1];
    } else {
      categoryId = "";
    }
    getproductData(categoryId);
    setDataNotFound(false);
    setuserData(JSON.parse(localStorage.getItem("userData")) || []);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const getproductData = async (log = "") => {
    setproductData([]);
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
    setLoading(true);
    const response = await productHndlerData(body);
    setproductData(response);
    if (response.length > 0) {
      setDataNotFound(false);
      setLoading(false);
    } else {
      setDataNotFound(true);
    }
    // if (response.data?.data?) {
    //   setDataNotFound(false);
    //   setLoading(false);
    // } else {
    //   setDataNotFound(true);
    // }
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
    // EventEmitter.dispatch("DATA", body.quantity.length);
    console.log(cartdata);
  };

  return (
    <div className="row no-gutters datas_container text">
      <div className="col-3 filter_div">
        <AllCategories id={getproductData} />
      </div>
      <div className="col-9 data_div">
        <div className="data_container">
          {productData.length > 0 &&
            productData.map((card) => {
              return (
                <div className="cardView " key={card.id}>
                  <img
                    src={URL + card.img}
                    className="card-img-top"
                    alt={card.name}
                  />

                  <div className="div1">
                    <p className="font_cardView text">
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
          {!dataNotFound && loading && (
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
          )}

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
