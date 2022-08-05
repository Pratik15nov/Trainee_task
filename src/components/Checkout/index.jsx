import React, { useEffect, useState, useRef } from "react";
import "./Checkout.css";
import { validName, validPhoneno } from "../../utils/helper";
import { Stepper, Step } from "react-form-stepper";
import { listBody } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  cartHndlerData,
  addaddressHndlerData,
  userHndlerData,
  promocodeHndlerData,
  razorpayDataHandler,
  addressHndlerData,
  addressDelHndler,
  editaddressHndlerData,
} from "../../service/auth.service";
import Addskeleton from "./Addskeleton";
import { Box } from "@mui/system";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const _DEV_ = document.domain === "localhost";

export default function Checkout() {
  /// Cart Summery>>
  const [cart, setCart] = useState([]);
  const [userData, setuserData] = useState([]);
  const [goSteps, setGoSteps] = useState(0);
  const [addData, setaddData] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountprice, setDiscountprice] = useState(0);
  const [address_1, setAddress] = useState("");
  const [address_2, setAddress2] = useState("");
  const [pincode, setPincode] = useState();
  const [promoCode, setPromoCode] = useState(""); // eslint-disable-next-line
  const [landmark, setLandmark] = useState(""); // eslint-disable-next-line
  const [type, setType] = useState("HOME"); // eslint-disable-next-line
  const [label, setLabel] = useState(""); // eslint-disable-next-line
  const [labelErr, setLabelErr] = useState(false); // eslint-disable-next-line
  const [addressErr, setAddressErr] = useState(false);
  const [address2Err, setAddress2Err] = useState(false); // eslint-disable-next-line
  const [pincodeErr, setPincodeErr] = useState(false);
  const [landmarkErr, setLandmarkErr] = useState(false);
  const [promocodeErr, setPromocoderr] = useState(false);
  const [promocodeSuc, setPromocodeSuc] = useState(false); // eslint-disable-next-line
  const [Promocode, setpromocodeData] = useState(false); // eslint-disable-next-line

  const [addressId, setaddressId] = useState();
  const [adddiv, setAdddiv] = useState(false);
  const [addeditdiv, setAddeditdiv] = useState(false);
  const [localuserData, setlocaluserData] = useState(false);
  const [editadd, seteditadd] = useState([]);
  const [editId, seteditId] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // const [userId, setmainuid] = useState(localuserData.id);
  const { search } = location;
  const userId = localuserData.id;
  // const Promocode = [
  //   {
  //     code: "50OFF",
  //     discount: "50%",
  //   },
  //   {
  //     code: "25OFF",
  //     discount: "25%",
  //   },
  //   {
  //     code: "10OFF",
  //     discount: "10%",
  //   },
  // ];

  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
    } else {
      userId = "";
    }
    getcartproductData(userId);
    getuserData(userId);
    getaddData(userId);
    setlocaluserData(JSON.parse(localStorage.getItem("userData")));
    getPromocode();
  }, [search]);

  const getcartproductData = async (log = "") => {
    const response = await cartHndlerData(
      listBody({
        where: { userId: log },
      })
    );
    if (response?.length > 0) {
      setCart(response[0]?.cartdetail);
    }
  };

  const getPromocode = async () => {
    const response = await promocodeHndlerData(
      listBody({
        where: { isActive: true },
      })
    );
    console.log(response);
    if (response?.length > 0) {
      setpromocodeData(response);
    }
  };

  const getuserData = async (userId) => {
    // eslint-disable-next-line
    const response = await userHndlerData(userId);
    setuserData(response);
  };

  const updatedData = cart.map((cart) => ({ ...cart, ...cart.productId })); //Spread Ope..
  const orderSubtotal = Object.values(updatedData).reduce(
    (r, { price }) => r + price,
    0
  );

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
    setPromocodeSuc();
  };

  const finalValue =
    orderSubtotal +
    (orderSubtotal / 100) * 18 -
    (orderSubtotal * discountPercent) / 100;

  const TOTAL_PRICE = orderSubtotal > 500 ? finalValue : finalValue + 40;
  const validate1 = () => {
    let formIsValid = true;
    if (!validName.test(address_1)) {
      formIsValid = false;
      setAddressErr("Your Address is invalid");
    }

    if (!validPhoneno.test(pincode)) {
      formIsValid = false;
      setPincodeErr("Your Pincode is invalid");
    }

    if (!validName.test(label)) {
      formIsValid = false;
      setLabelErr("Your Label is invalid");
    }

    return formIsValid;
  };

  const addresshandleSubmit = (e) => {
    if (!validate1()) {
    } else {
      postAddData(e);
      setAdddiv(false);
      getaddData();
    }
    e.preventDefault();
  };

  const postAddData = async (event) => {
    event.preventDefault();
    const body = {
      userId,
      address_1,
      address_2,
      label,
      landmark,
      pincode,
      type,
    };
    const response = await addaddressHndlerData(body); // eslint-disable-next-line
    if (response) {
      getaddData(userId);
    }
  };

  const editaddressHndler = async (event) => {
    event.preventDefault();
    const body = {
      address_1,
      address_2,
      label,
      landmark,
      pincode,
      type,
    };
    const response = await editaddressHndlerData(editId, body);

    if (response) {
      setAddeditdiv(false);
      getaddData(userId);
    }
  };

  const getaddData = async (log = "") => {
    setLoading(true);
    const response = await addressHndlerData(
      listBody({
        where: { userId: log, isActive: true },
      })
    );

    if (response) {
      setaddData(response);
      setLoading(false);
    }
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setaddressId(value);
    }
  };

  const addcheckhandle = (e) => {
    if (addressId) {
      setGoSteps(1);
      localStorage.setItem("SeletedAddressId", addressId);
    } else {
      alert("Select One Address");
    }
  };

  const addDelhandler = async (itemId) => {
    const response = await addressDelHndler(itemId);

    if (response) {
      getaddData(userId);
    }
  };
  const addressedit = async (id) => {
    setAddeditdiv(true);
    const response = await addressHndlerData(
      listBody({
        where: { isActive: true, _id: id },
      })
    );

    if (response?.length > 0) {
      seteditadd(response[0]);
      seteditId(response[0]?._id);
    }
  };

  const discount = (orderSubtotal * discountPercent) / 100;

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load, Are you online");
      return;
    }

    const body = {
      amount: TOTAL_PRICE,
    };
    const response = await razorpayDataHandler(body);

    if (response.data) {
      const options = {
        key: _DEV_
          ? "rzp_test_XqUGrjRWQI1oVV"
          : "enter here your live mode key from razorpay ",
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.order_id,
        name: "Shoppy",
        description: "Payment options",
        image: "../images/pop_up_logo.png",

        handler: function (response) {
          setGoSteps(2);
          setCart([]);
          console.log("RESPONSE AFTER THE PAYMENT SUCCESSFULL", response);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: userData.firstName + " " + userData.lastName,
          email: userData.email,
          contact: userData.phoneNumber,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      console.log("API CALL ERROR WHILE GETTING  SECRECT KEY RAZOR PAY");
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const invoiceData = JSON.parse(localStorage.getItem("Data"));
  // console.log(invoiceData);
  const componentRef = useRef();

  const checkPromoCode = () => {
    for (var i = 0; i < Promocode.length; i++) {
      if (promoCode === Promocode[i].couponcode) {
        if (Promocode[i].type === "PERCENTAGE") {
          if(orderSubtotal?Promocode[i].maxdiscountvalue){}
          else{}
          setDiscountPercent(parseFloat(Promocode[i].maxdiscountvalue));
          setPromocodeSuc("Promocode Applied!");
        } else {
          setDiscountprice(parseFloat(Promocode[i].maxdiscountvalue));
          setPromocodeSuc("Promocode Applied!");
        }

        setPromocoderr();

        return;
      }
      if (!validName.test(promoCode)) {
        setPromocoderr("Your Promocode is invalid !");
        setDiscountPercent(0);
        setPromocodeSuc();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row main">
          <div className="col-lg-12 Checkcard">
            <Stepper activeStep={goSteps} className="subt">
              <Step label="Delivery Address" />
              <Step label="Order Payment" />
              <Step label="Order Invoice" />
            </Stepper>
            {goSteps === 0 && (
              <>
                {!adddiv && !addeditdiv && (
                  <>
                    <div className="row customcard">
                      <h4 className="main-heading main">Delivery Address</h4>
                      {/* {loading && (
                        <PropagateLoader className="loadingdata" size={25} />
                      )} */}

                      {loading && (
                        <Box>
                          <Addskeleton />
                          <Addskeleton />
                          <Addskeleton />
                          <Addskeleton />
                        </Box>
                      )}

                      {addData.length > 0 &&
                        !loading &&
                        addData.map((data, index) => {
                          return (
                            <label className="col-md-5 mb-3  form-check">
                              <input
                                type="radio"
                                className="checkbox-input-adds form-check-input"
                                id={`${("flexRadioDefault", index + 1)}`}
                                value={data._id}
                                name="optradio"
                                // checked={checked === option.value}
                                onChange={(e) => handlecheckbox(e)}
                              />
                              <span className="checkbox-adds">
                                <span className="checkbox-icon">
                                  <h5 className="cardhending">
                                    {data.type}
                                    <i
                                      className="fa-solid fa-trash-can delicon"
                                      onClick={() => addDelhandler(data._id)}
                                    ></i>
                                    <i
                                      className="fa-solid fa-pen-to-square editicon"
                                      onClick={() => addressedit(data._id)}
                                    ></i>
                                  </h5>
                                  <p className="cardcon">
                                    {data.address_1}
                                    {data.address_2}
                                  </p>
                                </span>
                              </span>
                            </label>
                          );
                        })}

                      {!loading && (
                        <button
                          className="col-md-6  addcardbutton"
                          onClick={() => setAdddiv(true)}
                        >
                          + Add Delivery Address
                        </button>
                      )}

                      <div className="row mt-5">
                        <div className="col-sm-3">
                          <Link
                            className="button"
                            to={`/cart?uid=${localuserData.id}`}
                          >
                            Go to cart
                          </Link>
                        </div>
                        <div className="col-sm-7"></div>
                        <div className="col-sm-2">
                          <button
                            className="button"
                            type="submit"
                            onClick={() => addcheckhandle()}
                          >
                            Next Step
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {adddiv && (
                  <form
                    className="customcard"
                    method="post"
                    onSubmit={(e) => {
                      addresshandleSubmit(e);
                    }}
                  >
                    <h4 className="main-heading main">
                      Enter Delivery Address
                    </h4>
                    <div className="col-md-8 mb-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Address"
                        name="Address"
                        value={address_1}
                        onChange={(e) => [
                          setAddress(e.target.value),
                          setAddressErr(""),
                        ]}
                      />
                      {addressErr && <p className="errorstyle">{addressErr}</p>}
                    </div>

                    <div className="col-md-8 mb-3">
                      <label htmlFor="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Enter Address 2"
                        name="Address2"
                        value={address_2}
                        onChange={(e) => [
                          setAddress2(e.target.value),
                          setAddress2Err(""),
                        ]}
                      />
                      {address2Err && (
                        <p className="errorstyle">{address2Err}</p>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="address2">
                        Label <span className="text-muted"></span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="label"
                        placeholder="Enter Recevier Name"
                        name="label"
                        value={label}
                        onChange={(e) => [
                          setLabel(e.target.value),
                          setLabelErr(""),
                        ]}
                      />
                      {labelErr && <p className="errorstyle">{labelErr}</p>}
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          id="landmark"
                          placeholder="Enter Landmark"
                          name="landmark"
                          value={landmark}
                          onChange={(e) => [
                            setLandmark(e.target.value),
                            setLandmarkErr(""),
                          ]}
                        />
                        {landmarkErr && (
                          <p className="errorstyle">{landmarkErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Enter Pincode"
                          name="pincode"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => [
                            setPincode(parseInt(e.target.value)),
                            setPincodeErr(""),
                          ]}
                        />
                        {pincodeErr && (
                          <p className="errorstyle">{pincodeErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Select type of Address</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={type}
                          onChange={(e) => [setType(e.target.value)]}
                        >
                          <option value="HOME" selected>
                            Home
                          </option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <hr className="mb-4" />
                    <div className="row">
                      <div className="col-sm-3">
                        <button
                          className="button"
                          onClick={() => setAdddiv(false)}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-sm-7"></div>
                      <div className="col-sm-2">
                        <button className="button">Save</button>
                      </div>
                    </div>
                  </form>
                )}

                {addeditdiv && (
                  <form
                    className="customcard"
                    method="post"
                    onSubmit={(e) => {
                      editaddressHndler(e);
                    }}
                  >
                    <h4 className="main-heading main">
                      Update Delivery Address
                    </h4>
                    <div className="col-md-8 mb-3">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="Address"
                        value={editadd.address_1}
                        onChange={(e) => [
                          setAddress(e.target.value),
                          setAddressErr(""),
                        ]}
                      />
                      {addressErr && <p className="errorstyle">{addressErr}</p>}
                    </div>

                    <div className="col-md-8 mb-3">
                      <label htmlFor="address2">
                        Address 2 <span className="text-muted">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address2"
                        placeholder="Enter Address 2"
                        name="Address2"
                        value={editadd.address_2}
                        onChange={(e) => [
                          setAddress2(e.target.value),
                          setAddress2Err(""),
                        ]}
                      />
                      {address2Err && (
                        <p className="errorstyle">{address2Err}</p>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="address2">
                        Label <span className="text-muted"></span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="label"
                        placeholder="Enter Recevier Name"
                        name="label"
                        value={editadd.label}
                        onChange={(e) => [
                          setLabel(e.target.value),
                          setLabelErr(""),
                        ]}
                      />
                      {labelErr && <p className="errorstyle">{labelErr}</p>}
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          id="landmark"
                          placeholder="Enter Landmark"
                          name="landmark"
                          maxLength={10}
                          value={editadd.landmark}
                          onChange={(e) => [
                            setLandmark(e.target.value),
                            setLandmarkErr(""),
                          ]}
                        />
                        {landmarkErr && (
                          <p className="errorstyle">{landmarkErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Enter Pincode"
                          name="pincode"
                          maxLength={6}
                          value={editadd.pincode}
                          onChange={(e) => [
                            setPincode(parseInt(e.target.value)),
                            setPincodeErr(""),
                          ]}
                        />
                        {pincodeErr && (
                          <p className="errorstyle">{pincodeErr}</p>
                        )}
                      </div>
                      <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Select type of Address</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={editadd.type}
                          onChange={(e) => [setType(e.target.value)]}
                        >
                          <option value="HOME" selected>
                            Home
                          </option>
                          <option value="WORK">Work</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>

                    <hr className="mb-4" />
                    <div className="row">
                      <div className="col-sm-2">
                        <button
                          className="button"
                          onClick={() => setAddeditdiv(false)}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-sm-7"></div>
                      <div className="col-sm-3">
                        <button className="button" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}

            {goSteps === 1 && (
              <div className="col customcard ">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Your Cart Summary</span>
                </h4>
                <div className="input-group"></div>
                <div className="row">
                  <div className="col-sm-6"></div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Have Promo code ?"
                      onChange={(e) => [
                        onEnterPromoCode(e),
                        setPromocoderr(""),
                      ]}
                    />
                  </div>
                  <div className="col-sm-3">
                    <button
                      className="button applynow"
                      onClick={checkPromoCode}
                    >
                      Apply Now
                    </button>
                    <br />
                    {promocodeErr && (
                      <p className="errorstyle">{promocodeErr}</p>
                    )}
                    {promocodeSuc && <p className="Sstyle">{promocodeSuc}</p>}
                  </div>
                </div>

                <br />
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 text">Total Price of Product</h6>
                    </div>
                    <span className="text-muted">&#x20b9; {orderSubtotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                      <h6 className="my-0 text">Discount Price</h6>
                    </div>
                    <span className="text-success">&#x20b9; {discount}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div className="text-success">
                      <h6 className="my-0 text">After Discount Total Price </h6>
                    </div>
                    <span className="text-success">
                      &#x20b9; {orderSubtotal - discount}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 text">Tax (SGST+ CGST)</h6>
                    </div>
                    <span className="text-muted">
                      &#x20b9; {(orderSubtotal / 100) * 18}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0 text">Shipping Charge</h6>
                    </div>
                    <span className="text-muted">
                      &#x20b9; {orderSubtotal > 500 ? "0" : "40"}
                    </span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span>Total</span>
                    <strong>
                      &#x20b9;
                      {/* {orderSubtotal > 500 ? finalValue : finalValue + 40} */}
                      {TOTAL_PRICE}
                    </strong>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4">
                    {/* <Link to="/order">
                      <button
                        type="submit"
                        className="button"
                        onClick={handleSubmit}
                      >
                        Place Order
                      </button>
                    </Link> */}
                  </div>
                  <div className="col-sm-4"></div>
                </div>

                <hr className="mb-4" />
                <div className="row">
                  <div className="col-sm-2">
                    <button className="button" onClick={() => setGoSteps(0)}>
                      Back
                    </button>
                  </div>
                  <div className="col-sm-7"></div>
                  <div className="col-sm-3">
                    <button className="button" onClick={displayRazorpay}>
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* {goSteps === 2 && (<StripeContainer price={TOTAL_PRICE} />)} */}
            {goSteps === 2 && (
              <div className="col customcard">
                <div className="container-fluid invoice">
                  <div className="row maincard ">
                    <div className="col-12">
                      <div className="page-title-box row">
                        <div className="page-title-right col-sm-3 ">
                          <button
                            onClick={() => handlePrint()}
                            className="button"
                          >
                            Print Invoice
                          </button>
                        </div>
                        <div className="col-sm-3"></div>

                        <div className="col-sm-6 Sstyle">
                          Thank you. Your order has been received.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row invoicecard " ref={componentRef}>
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="clearfix">
                            <div className="float-start mb-3">
                              <img
                                src="../images/logob.png"
                                className="logoimg"
                                alt="logo"
                              ></img>
                            </div>
                            <div className="float-end">
                              <h4 className="m-0 d-print-none text">Invoice</h4>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6">
                              <div className="float-end mt-3">
                                <p>
                                  <b>Hello,</b>
                                </p>
                                <p className="text-muted font-13">
                                  Please find below a cost-breakdown for the
                                  recent work completed. Please make payment at
                                  your earliest convenience, and do not hesitate
                                  to contact me with any questions.
                                </p>
                              </div>
                            </div>

                            <div className="col-sm-4 offset-sm-2">
                              <div className="mt-3 float-sm-end">
                                <p className="font-13">
                                  <strong>Order Date:</strong>
                                  &nbsp;&nbsp;&nbsp;
                                </p>
                                <p className="font-13">
                                  <strong>Order Status: </strong>
                                  <span className="badge bg-success float-end">
                                    Paid
                                  </span>
                                </p>
                                <p className="font-13">
                                  <strong>Order ID: </strong>{" "}
                                  <span className="float-end"></span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-sm-4">
                              <h6>Address</h6>
                              <address></address>
                            </div>

                            <div className="col-sm-4">
                              <h6>Shipping Address</h6>
                              <address></address>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-12">
                              <div className="table-responsive">
                                <table className="table mt-4">
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Item</th>
                                      <th>Quantity</th>
                                      <th>Cost</th>
                                      <th className="text-end">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* <tr>
                                          <td>{index + 1}</td>
                                          <td>
                                            <b>{data.name}</b> <br />
                                          </td>
                                          <td>{data.quantity}</td>
                                          <td>
                                            &#x20b9;{" "}
                                            {data.price / data.quantity}
                                          </td>
                                          <td className="text-end">
                                            &#x20b9; {data.price}
                                          </td>
                                        </tr> */}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6">
                              <div className="clearfix pt-3">
                                <h6 className="text-muted">Notes:</h6>
                                <small>
                                  All accounts are to be paid within 7 days from
                                  receipt of invoice.
                                </small>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="float-end mt-3 mt-sm-0">
                                <p>
                                  <b>Sub-total:</b>
                                  <span className="float-end"></span>
                                </p>
                                <p>
                                  <b>Tax(CGST+SGST):</b>
                                  <span className="float-end"></span>
                                </p>
                                <p>
                                  <b>Shipping Charge: </b>
                                  <span className="float-end"></span>
                                </p>
                                <p>
                                  <b>Discount: </b>
                                  <span className="float-end"></span>
                                </p>
                                <p>
                                  <b>Total &#x20b9; </b>
                                  <span className="float-end"></span>
                                </p>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
