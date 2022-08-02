import React, { useEffect, useState, useRef } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../../utils/helper";
import { validName } from "../../utils/helper";
import { validPhoneno } from "../../utils/helper";
import { Stepper, Step } from "react-form-stepper";
// import { useFormik } from "formik";
// import Select from "react-select";
// import csc from "country-state-city";
import { useReactToPrint } from "react-to-print";
import { listBody } from "../../utils/helper";
import { useLocation } from "react-router-dom";
import {
  cartHndlerData,
  addressHndlerData,
  userHndlerData,
  promocodeHndlerData,
} from "../../service/auth.service";
// import StripeCheckoutButton from "../StripeCheckoutComponent";

export default function Checkout() {
  /// Cart Summery>>

  const [cart, setCart] = useState([]);
  const [userData, setuserData] = useState([]);
  const [goSteps, setGoSteps] = useState(0);
  const location = useLocation();
  const [userId, setuid] = useState();
  const { search } = location;

  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
    } else {
      userId = "";
    }

    getcartproductData(userId);
    setuid(userId);
    getuserData(userId);
    // setCart(JSON.parse(localStorage.getItem("Data")) || []);
  }, [search]);

  // const conHandler = (event) => {
  //   console.log(event.name);
  //   setDropcountry(event.name);
  // };
  // const stateHandler = (event) => {
  //   console.log(event.name);
  //   setDropstate(event.name);
  // };
  // const cityHandler = (event) => {
  //   console.log(event.name);
  //   setDropcity(event.name);
  // };

  const getcartproductData = async (log = "") => {
    const response = await cartHndlerData(
      listBody({
        where: { userId: log },
      })
    );
    if (response.length > 0) {
      setCart(response[0]?.cartdetail);
    }
  };

  const getuserData = async (userId) => {
    const response = await userHndlerData(userId);
    setuserData(response.data?.data);
    setuid(response.data?.data._id);
  };
  const updatedData = cart.map((cart) => ({ ...cart, ...cart.productId })); //Spread Ope..
  const orderSubtotal = Object.values(updatedData).reduce(
    (r, { price }) => r + price,
    0
  );

  const Promocode = [
    {
      code: "50OFF",
      discount: "50%",
    },
    {
      code: "25OFF",
      discount: "25%",
    },
    {
      code: "10OFF",
      discount: "10%",
    },
  ];

  const [discountPercent, setDiscountPercent] = useState(0);
  const discount = (orderSubtotal * discountPercent) / 100;
  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
    setPromocodeSuc();
  };
  const checkPromoCode = () => {
    for (var i = 0; i < Promocode.length; i++) {
      if (promoCode === Promocode[i].code) {
        setDiscountPercent(parseFloat(Promocode[i].discount.replace("%", "")));
        setPromocoderr();
        setPromocodeSuc("Promocode Applied Successfully!");
        return;
      }
      if (!validName.test(promoCode)) {
        setPromocoderr("Your Promocode is invalid !");
        setDiscountPercent(0);
        setPromocodeSuc();
      }
    }
  };
  const finalValue =
    orderSubtotal +
    (orderSubtotal / 100) * 18 -
    (orderSubtotal * discountPercent) / 100;

  // Submit Data To Localstroage>>

  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [phoneno, setPhoneno] = useState("");
  // const [email, setEmail] = useState("");
  const [address_1, setAddress] = useState("");
  const [address_2, setAddress2] = useState("");
  const [cardname, setCardname] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [cvv, setCvv] = useState(""); // eslint-disable-next-line
  const [pincode, setPincode] = useState();
  const [promoCode, setPromoCode] = useState(""); // eslint-disable-next-line
  const [landmark, setLandmark] = useState(""); // eslint-disable-next-line
  const [type, setType] = useState("HOME"); // eslint-disable-next-line

  // const [emailErr, setEmailErr] = useState(false);
  // const [fnameErr, setfnameErr] = useState(false);
  // const [lnameErr, setlnameErr] = useState(false);
  // const [phonenoErr, setphonenoErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [address2Err, setAddress2Err] = useState(false); // eslint-disable-next-line
  const [pincodeErr, setPincodeErr] = useState(false);
  const [cardnameErr, setCardnameErr] = useState(false);
  const [cardnumberErr, setCardnumberErr] = useState(false);
  const [expdateErr, setExpdateErr] = useState(false);
  const [cvvErr, setCvvErr] = useState(false);
  const [landmarkErr, setLandmarkErr] = useState(false);
  const [promocodeErr, setPromocoderr] = useState(false);
  const [promocodeSuc, setPromocodeSuc] = useState(false); // eslint-disable-next-line

  const allData = [];
  const Navigate = useNavigate();

  const validate1 = () => {
    let formIsValid = true;
    if (!validName.test(address_1)) {
      formIsValid = false;
      setAddressErr("Your Address is invalid");
    }
    if (!validName.test(address_2)) {
      formIsValid = false;
      setAddress2Err("Your Address is invalid");
    }
    // if (!validPhoneno.test(pincode)) {
    //   formIsValid = false;
    //   setPincodeErr("Your Pincode is invalid");
    // }

    return formIsValid;
  };

  const addresshandleSubmit = (e) => {
    if (validate1() !== true) {
    } else {
      postAddData(e);
    }
    e.preventDefault();
  };
  const postAddData = async (event) => {
    event.preventDefault();
    const body = {
      userId,
      address_1,
      address_2,
      landmark,
      pincode,
      type,
    };
    const response = await addressHndlerData(body); // eslint-disable-next-line
    if (response) {
      setGoSteps(1);
    }
  };

  const current = new Date();
  const orderDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const invoiceData = JSON.parse(localStorage.getItem("Data"));
  // console.log(invoiceData);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const addressFromik = useFormik({
  //   initialValues: {
  //     country: null,
  //     state: null,
  //     city: null,
  //   },
  // });

  // const countries = csc.getAllCountries();

  // const updatedCountries = countries.map((country) => ({
  //   label: country.name,
  //   value: country.id,
  //   ...country,
  // }));
  // const updatedStates = (countryId) =>
  //   csc
  //     .getStatesOfCountry(countryId)
  //     .map((state) => ({ label: state.name, value: state.id, ...state }));

  // const updatedCities = (stateId) =>
  //   csc
  //     .getCitiesOfState(stateId)
  //     .map((city) => ({ label: city.name, value: city.id, ...city }));
  // // eslint-disable-next-line
  // const { values, setFieldValue, setValues } = addressFromik;
  // console.log();
  // useEffect(() => {}, [values]);

  return (
    <>
      <div className="container">
        <div className="row main">
          <div className="col-lg-12 Checkcard">
            <Stepper activeStep={goSteps} className="subt">
              <Step onClick={() => setGoSteps(0)} label="Delivery Address" />
              <Step onClick={() => setGoSteps(1)} label="Complete Order" />
              <Step onClick={() => setGoSteps(2)} label="Payment Option" />
              <Step onClick={() => setGoSteps(3)} label="Order Invoice" />
            </Stepper>
            {goSteps === 0 && (
              <form
                className="customcard"
                method="post"
                onSubmit={(e) => {
                  addresshandleSubmit(e);
                }}
              >
                <h4 className="main-heading main">Enter Shipping Address</h4>
                {/* <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter First name"
                      name="firstName"
                      maxLength={15}
                      value={userData.firstName}
                      onChange={(e) => [
                        setFirstname(e.target.value),
                        setfnameErr(""),
                      ]}
                    />

                    {fnameErr && <p className="errorstyle">{fnameErr}</p>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Last name"
                      name="lastName"
                      maxLength={15}
                      value={userData.lastName}
                      onChange={(e) => [
                        setLastname(e.target.value),
                        setlnameErr(""),
                      ]}
                    />
                    {lnameErr && <p className="errorstyle">{lnameErr}</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      name="email"
                      value={userData.email}
                      onChange={(e) => [
                        setEmail(e.target.value),
                        setEmailErr(""),
                      ]}
                    />
                    {emailErr && <p className="errorstyle">{emailErr}</p>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="text">
                      Phone No <span className="text-muted"></span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter Phone No"
                      name="e"
                      maxLength={10}
                      value={userData.phoneNumber}
                      onChange={(e) => [
                        setPhoneno(e.target.value),
                        setphonenoErr(""),
                      ]}
                    />
                    {phonenoErr && <p className="errorstyle">{phonenoErr}</p>}
                  </div>
                </div> */}

                <div className="col-md-8 mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    name="Address"
                    maxLength={15}
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
                    maxLength={15}
                    value={address_2}
                    onChange={(e) => [
                      setAddress2(e.target.value),
                      setAddress2Err(""),
                    ]}
                  />
                  {address2Err && <p className="errorstyle">{address2Err}</p>}
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
                      value={landmark}
                      onChange={(e) => [
                        setLandmark(e.target.value),
                        setLandmarkErr(""),
                      ]}
                    />
                    {landmarkErr && <p className="errorstyle">{landmarkErr}</p>}
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
                    {pincodeErr && <p className="errorstyle">{pincodeErr}</p>}
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

                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="save-info"
                  />
                  <label className="custom-control-label" htmlFor="save-info">
                    Save this information for next time
                  </label>
                </div>

                <hr className="mb-4" />
                <div className="row">
                  <div className="col-sm-3">
                    {/* <Link className="button" to="/cart">
                      Go to cart
                    </Link> */}
                  </div>
                  <div className="col-sm-7"></div>
                  <div className="col-sm-2">
                    <button className="button" type="submit">
                      Next
                    </button>
                  </div>
                </div>
              </form>
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
                      <h6 className="my-0">Total Price of Product</h6>
                    </div>
                    <span className="text-muted">&#x20b9; {orderSubtotal}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                      <h6 className="my-0">Discount Price</h6>
                    </div>
                    <span className="text-success">&#x20b9; {discount}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <div className="text-success">
                      <h6 className="my-0">After Discount Total Price </h6>
                    </div>
                    <span className="text-success">
                      &#x20b9; {orderSubtotal - discount}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">Tax (SGST+ CGST)</h6>
                    </div>
                    <span className="text-muted">
                      &#x20b9; {(orderSubtotal / 100) * 18}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">Shipping Charge</h6>
                    </div>
                    <span className="text-muted">
                      &#x20b9; {orderSubtotal > 500 ? "0" : "40"}
                    </span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span>Total</span>
                    <strong>
                      &#x20b9;
                      {orderSubtotal > 500 ? finalValue : finalValue + 40}
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
                    <button className="button" onClick={() => setGoSteps(2)}>
                      Pay Now
                    </button>
                    {/* <StripeCheckoutButton
                      price={orderSubtotal > 500 ? finalValue : finalValue + 40}
                    /> */}
                  </div>
                </div>
              </div>
            )}
            {goSteps === 2 && (
              <form className="customcard">
                <h4 className="mb-3 ">Payment</h4>
                <div className="d-block my-3">
                  <div className="custom-control custom-radio">
                    <input
                      id="credit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                      defaultChecked
                    />
                    <label className="custom-control-label" htmlFor="credit">
                      Credit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="debit"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="debit">
                      Debit card
                    </label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input
                      id="paypal"
                      name="paymentMethod"
                      type="radio"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-name">Name on card</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-name"
                      placeholder="Enter Name on card"
                      name="cardname"
                      maxLength={15}
                      value={cardname}
                      onChange={(e) => [
                        setCardname(e.target.value),
                        setCardnameErr(""),
                      ]}
                    />
                    {cardnameErr && <p className="errorstyle">{cardnameErr}</p>}

                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cc-number">Card number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardnumber"
                      placeholder="1234 5678 9101"
                      name="cardnumber"
                      maxLength={10}
                      value={cardnumber}
                      onChange={(e) => [
                        setCardnumber(e.target.value),
                        setCardnumberErr(""),
                      ]}
                    />
                    {cardnumberErr && (
                      <p className="errorstyle">{cardnumberErr}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-expiration">Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cc-expiration"
                      placeholder="7/27"
                      name="expdate"
                      maxLength={10}
                      value={expdate}
                      onChange={(e) => [
                        setExpdate(e.target.value),
                        setExpdateErr(""),
                      ]}
                    />
                    {expdateErr && <p className="errorstyle">{expdateErr}</p>}
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cc-cvv">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="123"
                      name="cardnumber"
                      maxLength={10}
                      value={cvv}
                      onChange={(e) => [setCvv(e.target.value), setCvvErr("")]}
                    />
                    {cvvErr && <p className="errorstyle">{cvvErr}</p>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    {" "}
                    <button className="button">Pay</button>
                  </div>
                  <div className="col-sm-4"></div>
                  <div className="col-sm-4"></div>
                </div>
                <hr className="mb-4" />
                <div className="row">
                  <div className="col-sm-2">
                    <button className="button" onClick={() => setGoSteps(1)}>
                      Back
                    </button>
                  </div>
                  <div className="col-sm-8"></div>
                  <div className="col-sm-2">
                    <button className="button" onClick={() => setGoSteps(3)}>
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )}
            {goSteps === 3 && (
              <div className="col customcard">
                {/* <div className="container-fluid invoice">
                  <div className="row maincard ">
                    <div className="col-12">
                      <div className="page-title-box row">
                        <div className="page-title-right col-sm-3 ">
                          <button onClick={handlePrint} className="button">
                            Print Invoice
                          </button>
                        </div>
                        <div className="col-sm-3">
                          <button
                            className="button"
                            onClick={() => setGoSteps(2)}
                          >
                            Back
                          </button>
                        </div>

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
                              <h1>eCommerce</h1>
                            </div>
                            <div className="float-end">
                              <h4 className="m-0 d-print-none">Invoice</h4>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6">
                              <div className="float-end mt-3">
                                <p>
                                  <b>
                                    Hello,
                                    {JSON.parse(
                                      localStorage.getItem("First Name")
                                    )}
                                    {JSON.parse(
                                      localStorage.getItem("Last Name")
                                    )}
                                  </b>
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
                                  <strong>
                                    Order Date:
                                    {JSON.parse(
                                      localStorage.getItem("OrderDate")
                                    )}{" "}
                                  </strong>{" "}
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
                                  <span className="float-end">123456</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="row mt-4">
                            <div className="col-sm-4">
                              <h6>Address</h6>
                              <address>
                                {JSON.parse(localStorage.getItem("Address"))}
                              </address>
                            </div>

                            <div className="col-sm-4">
                              <h6>Shipping Address</h6>
                              <address>
                                {JSON.parse(localStorage.getItem("Address2"))}
                              </address>
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
                                    {invoiceData.map((data, index) => {
                                      return (
                                        <tr>
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
                                        </tr>
                                      );
                                    })}
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
                                  <span className="float-end">
                                    {JSON.parse(
                                      localStorage.getItem("Order Total")
                                    )}
                                  </span>
                                </p>
                                <p>
                                  <b>Tax(CGST+SGST):</b>
                                  <span className="float-end">
                                    {JSON.parse(localStorage.getItem("Tax"))}
                                  </span>
                                </p>
                                <p>
                                  <b>Shipping Charge: </b>
                                  <span className="float-end">
                                    {JSON.parse(
                                      localStorage.getItem("Shipping Charge")
                                    )}
                                  </span>
                                </p>
                                <p>
                                  <b>Discount: </b>
                                  <span className="float-end">
                                    {JSON.parse(
                                      localStorage.getItem("Discount")
                                    )}
                                  </span>
                                </p>
                                <p>
                                  <b>Total &#x20b9; </b>
                                  <span className="float-end">
                                    {JSON.parse(localStorage.getItem("Total"))}
                                  </span>
                                </p>
                              </div>
                              <div className="clearfix" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
