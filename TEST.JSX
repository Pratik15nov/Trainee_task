import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "../../utils/helper";
import { validName } from "../../utils/helper";
import { validPhoneno } from "../../utils/helper";

// import { csc } from "country-state-city";

export default function Checkout() {
  /// Cart Summery>>

  const [cart, setCart] = useState([]);
  // const [countries, setCountries] = useState({});

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("Data")));
    // const getAllCountries = async () => {
    //   try {
    //     let countries = await csc.getAllCountries();
    //     console.log(countries);
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   getAllCountries();
    // };
  }, []);

  const orderSubtotal = Object.values(cart).reduce(
    (r, { rate }) => r + rate,
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
        setPromocodeSuc("Promocode Applied Successfully! ");
        return;
      }
      if (!validName.test(promoCode)) {
        setPromocoderr("Your Promo code is invalid !");
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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [cardname, setCardname] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [expdate, setExpdate] = useState("");
  const [cvv, setCvv] = useState("");
  const [pincode, setPincode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [fnameErr, setfnameErr] = useState(false);
  const [lnameErr, setlnameErr] = useState(false);
  const [phonenoErr, setphonenoErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [address2Err, setAddress2Err] = useState(false);
  const [pincodeErr, setPincodeErr] = useState(false);
  const [cardnameErr, setCardnameErr] = useState(false);
  const [cardnumberErr, setCardnumberErr] = useState(false);
  const [expdateErr, setExpdateErr] = useState(false);
  const [cvvErr, setCvvErr] = useState(false);
  const [promocodeErr, setPromocoderr] = useState(false);
  const [promocodeSuc, setPromocodeSuc] = useState(false);
  const allData = [];
  const Navigate = useNavigate();
  const validate = () => {
    let formIsValid = true;
    if (!validEmail.test(email)) {
      formIsValid = false;
      setEmailErr("Your Email is invalid");
    }
    if (!validName.test(firstname)) {
      formIsValid = false;
      setfnameErr("Your First Name is invalid");
    }
    if (!validName.test(lastname)) {
      formIsValid = false;
      setlnameErr("Your Last Name is invalid");
    }
    if (!validPhoneno.test(phoneno)) {
      formIsValid = false;
      setphonenoErr("Your Phone No is invalid");
    }
    if (!validName.test(address)) {
      formIsValid = false;
      setAddressErr("Your Address is invalid");
    }
    if (!validName.test(address2)) {
      formIsValid = false;
      setAddress2Err("Your Address is invalid");
    }
    if (!validName.test(cardname)) {
      formIsValid = false;
      setCardnameErr("Your Card Name is invalid");
    }
    if (!validPhoneno.test(cardnumber)) {
      formIsValid = false;
      setCardnumberErr("Your Card Number is invalid");
    }
    if (!validPhoneno.test(expdate)) {
      formIsValid = false;
      setExpdateErr("Your Exp Date is invalid");
    }
    if (!validPhoneno.test(cvv)) {
      formIsValid = false;
      setCvvErr("Your CVV is invalid");
    }
    if (!validPhoneno.test(pincode)) {
      formIsValid = false;
      setPincodeErr("Your Pincode is invalid");
    }
    return formIsValid;
  };

  // const [countries, setCountries] = useState({});
  // useEffect(() => {
  //   const getAllCountries = async () => {
  //     try {
  //       let countries = await csc.getAllCountries();
  //       console.log(countries);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getAllCountries();
  // }, []);

  const handleSubmit = (e) => {
    if (validate() !== true) {
    } else {
      localStorage.setItem("First Name", JSON.stringify(firstname));
      localStorage.setItem("Last Name", JSON.stringify(lastname));
      localStorage.setItem("Email", JSON.stringify(email));
      localStorage.setItem("Phone No", JSON.stringify(phoneno));
      localStorage.setItem("Address", JSON.stringify(address));
      localStorage.setItem("Address2", JSON.stringify(address2));
      localStorage.setItem("Pincode", JSON.stringify(pincode));
      localStorage.setItem("Card Name", JSON.stringify(cardname));
      localStorage.setItem("Card Number", JSON.stringify(cardnumber));
      localStorage.setItem("Card ExpDate", JSON.stringify(expdate));
      localStorage.setItem("Card CVV", JSON.stringify(cvv));
      localStorage.setItem("Order Total", JSON.stringify(orderSubtotal));
      localStorage.setItem("Tax", JSON.stringify((orderSubtotal / 100) * 18));
      localStorage.setItem("Promocde", JSON.stringify(promoCode));
      localStorage.setItem("OrderDate", JSON.stringify(orderDate));
      localStorage.setItem(
        "Shipping Charge",
        JSON.stringify(orderSubtotal > 500 ? "0" : "40")
      );
      localStorage.setItem("Discount", JSON.stringify(discount));
      localStorage.setItem(
        "Total",
        JSON.stringify(orderSubtotal > 500 ? finalValue : finalValue + 40)
      );
      Navigate("/Order");
    }
    e.preventDefault();
    const details = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phoneno: phoneno,
      address: address,
      address2: address2,
      pincode: pincode,
      cardname: cardname,
      cardnumber: cardnumber,
      expdate: expdate,
      cvv: cvv,
    };
    allData.push(details);
    console.log(allData);
  };

  const current = new Date();
  const orderDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <div className="container">
      <div className="row main">
        <div className="col-lg-7 Checkcard">
          <h4 className="main-heading main">Enter Shipping Address</h4>
          <form className="needs-validation">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First name"
                  name="firstName"
                  maxLength={15}
                  value={firstname}
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
                  value={lastname}
                  onChange={(e) => [
                    setLastname(e.target.value),
                    setlnameErr(""),
                  ]}
                />
                {lnameErr && <p className="errorstyle">{lnameErr}</p>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => [setEmail(e.target.value), setEmailErr("")]}
              />
              {emailErr && <p className="errorstyle">{emailErr}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                Phone No <span className="text-muted"></span>
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Phone No"
                name="e"
                maxLength={10}
                value={phoneno}
                onChange={(e) => [
                  setPhoneno(e.target.value),
                  setphonenoErr(""),
                ]}
              />
              {phonenoErr && <p className="errorstyle">{phonenoErr}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                name="Address"
                maxLength={15}
                value={address}
                onChange={(e) => [
                  setAddress(e.target.value),
                  setAddressErr(""),
                ]}
              />
              {addressErr && <p className="errorstyle">{addressErr}</p>}

              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <div className="mb-3">
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
                value={address2}
                onChange={(e) => [
                  setAddress2(e.target.value),
                  setAddress2Err(""),
                ]}
              />
              {address2Err && <p className="errorstyle">{address2Err}</p>}
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country">
                  <option value>Choose...</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state">
                  <option value>Choose...</option>
                  <option>Gujarat</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  placeholder="123456"
                  name="pincode"
                  maxLength={10}
                  value={pincode}
                  onChange={(e) => [
                    setPincode(e.target.value),
                    setPincodeErr(""),
                  ]}
                />
                {pincodeErr && <p className="errorstyle">{pincodeErr}</p>}

                <div className="invalid-feedback">Zip code .</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
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
                <div className="invalid-feedback">Name on card is </div>
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
                {cardnumberErr && <p className="errorstyle">{cardnumberErr}</p>}

                <div className="invalid-feedback">Credit card number is</div>
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

                <div className="invalid-feedback">Expiration date </div>
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
            <hr className="mb-4" />
            <Link to="/Order">
              <button type="submit" className="button" onClick={handleSubmit}>
                Place Order
              </button>
            </Link>
          </form>
        </div>
        <div className="col-lg-4 Checkcard">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Cart Summary</span>
          </h4>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Have Promo code ?"
              onChange={(e) => [onEnterPromoCode(e), setPromocoderr("")]}
            />
            <div className="input-group-append">
              <button className="button applynow" onClick={checkPromoCode}>
                Apply Now
              </button>
            </div>
          </div>
          {promocodeErr && <p className="errorstyle">{promocodeErr}</p>}
          {promocodeSuc && <p className="Sstyle">{promocodeSuc}</p>}

          <br />
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Total Price of Product</h6>
              </div>
              <span className="text-muted">Rs: {orderSubtotal}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Discount Price</h6>
              </div>
              <span className="text-success">Rs : {discount}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div className="text-success">
                <h6 className="my-0">After Discount Total Price </h6>
              </div>
              <span className="text-success">
                Rs : {orderSubtotal - discount}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Tax (SGST+ CGST)</h6>
              </div>
              <span className="text-muted">
                Rs: {(orderSubtotal / 100) * 18}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Shipping Charge</h6>
              </div>
              <span className="text-muted">
                Rs: {orderSubtotal > 500 ? "0" : "40"}
              </span>
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <span>Total</span>
              <strong>
                Rs:
                {orderSubtotal > 500 ? finalValue : finalValue + 40}
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
