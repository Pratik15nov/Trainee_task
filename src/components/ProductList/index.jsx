import React, { useEffect, useState } from "react";
import "../ProductList/ProductList.css";
import Products from "../Products";
import CartModal from "../cartModalview";
import SeeMore from "../SeemoreCard";
import { EventEmitter } from "../../utils/helper";
import { listBody } from "../../utils/helper";
import {
  productHndlerData,
  addcartHndlerData,
} from "../../service/auth.service";
import Cardskeleton from "../Products/Cardskeleton";
import Box from "@mui/material/Box";

const ProductList = (props) => {
  const [show, setShow] = useState(false);
  const [childata, setChildata] = useState([]);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const parentFunc = () => {
    setShow(true);
  };
  const closeHandle = () => {
    setShow(false);
    setChildata([]);
  };
  const takeData = (info) => {
    setChildata(info);
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
    const response = await addcartHndlerData(body);
    EventEmitter.dispatch("DATA", body.quantity.length);
  };

  const [productData, setproductData] = useState([]);
  useEffect(() => {
    getproductData();
    setuserData(JSON.parse(localStorage.getItem("userData")) || []);
  }, []);

  const getproductData = async () => {
    const response = await productHndlerData(
      listBody({ where: { isActive: true } })
    );
    setproductData(response);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <h1 className="header_one">Popular product that we sold</h1>
        <p className="header_two">
          We provide best quality & fresh grocery items near your location
        </p>
        <div>
          {productData.length > 0 &&
            productData.slice(0, 7).map((card, index) => {
              return (
                <div key={`products_${index}`}>
                <Products
                  index={index}
                  parentFunc={parentFunc}
                  takeData={takeData}
                  card={card}
                  key={card.id}
                />
                </div>
              );
            })}
        </div>

        {loading && (
          <Box>
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
            <Cardskeleton />
          </Box>
        )}
        <div>
          <SeeMore />
        </div>
      </div>
      {show && (
        <CartModal
          childata={childata}
          cartFunc={cartFunc}
          closeHandle={closeHandle}
          userData={userData}
        />
      )}
    </div>
  );
};

export default ProductList;
