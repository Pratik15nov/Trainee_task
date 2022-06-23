import React, { useState } from "react";
import "./Register.css";
import Loginbg from "./loginbg.svg";
import { validEmail } from "../helper";
import { validName } from "../helper";
import { validPhoneno } from "../helper";
import { validPaasword } from "../helper";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [fnameErr, setfnameErr] = useState(false);
  const [lnameErr, setlnameErr] = useState(false);
  const [phonenoErr, setphonenoErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [selected, setSelected] = useState("male");

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
    if (!validPaasword.test(password)) {
      formIsValid = false;
      setPasswordErr("Your Password is invalid");
    }

    return formIsValid;
  };
  const handleSubmit = (e) => {
    if (validate() !== true) {
    } else {
      alert(firstname);
      localStorage.setItem("firstname", JSON.stringify(firstname));
      localStorage.setItem("lastname", JSON.stringify(lastname));
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("phoneno", JSON.stringify(phoneno));
      localStorage.setItem("password", JSON.stringify(password));
    }
    e.preventDefault();
  };
  const isButtonSelected = (value) => {
    if (selected === value) {
      return true;
    }
  };
  const onChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div className="container ">
      <img
        className="logo"
        src="https://frontendarmy.com/wp-content/uploads/2022/02/frontendarmy-logo.svg"
        alt="logo"
      />
      <div className="row">
        <div className="col-2">
          <img className="loginbg" src={Loginbg} alt="login" />
        </div>
        <form
          className="form col-1 scaled "
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          method="post"
        >
          <div>
            <h2>Register</h2>
          </div>
          <div>
            <label className="form-label">First Name</label>
            <div className="form-floating mb-1">
              <input
                className="form-control"
                placeholder="Enter Your Frist Name"
                type="text"
                name="fristname"
                maxLength={15}
                id="fristnameErr"
                value={firstname}
                onChange={(e) => [
                  setFirstname(e.target.value),
                  setfnameErr(""),
                ]}
              />
              <label htmlFor="fristnameErr">Enter First Name</label>
              {fnameErr && <p className="errorstyle">{fnameErr}</p>}
            </div>
            <label className="form-label">Last Name</label>
            <div className="form-floating mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                name="lastname"
                maxLength={15}
                id="lastnameErr"
                value={lastname}
                onChange={(e) => [setLastname(e.target.value), setlnameErr("")]}
              />
              <label htmlFor="lastnameErr">Enter Last Name</label>
              {lnameErr && <p className="errorstyle">{lnameErr}</p>}
            </div>
            <label className="form-label">Password</label>
            <div className="form-floating mb-1">
              <input
                type="password"
                className="form-control form-control-sm"
                placeholder="Enter Password"
                name="password"
                maxLength={15}
                id="passwordErr"
                value={password}
                onChange={(e) => [
                  setPassword(e.target.value),
                  setPasswordErr(""),
                ]}
              />
              <label htmlFor="passwordErr">Enter Password</label>
              {passwordErr && <p className="errorstyle">{passwordErr}</p>}
            </div>
            <label className="form-label">E-mail</label>
            <div className="form-floating mb-1">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter Email"
                name="email"
                id="emailErr"
                maxLength={30}
                value={email}
                onChange={(e) => [setEmail(e.target.value), setEmailErr("")]}
              />
              <label htmlFor="emailErr">Enter Email Address</label>
              {emailErr && <p className="errorstyle">{emailErr}</p>}
            </div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone No.
            </label>
            <div className="form-floating mb-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="name@example.com"
                id="phonenoErr"
                value={phoneno}
                maxLength={10}
                onChange={(e) => [
                  setPhoneno(e.target.value),
                  setphonenoErr(""),
                ]}
              />
              <label htmlFor="phonenoErr">Enter Phone Number</label>
              {phonenoErr && <p className="errorstyle">{phonenoErr}</p>}
            </div>
            <div className="mb-1">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Gender
              </label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="Male"
                    defaultValue="option1"
                    checked={isButtonSelected("male")}
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="Female"
                    defaultValue="option2"
                    checked={isButtonSelected("female")}
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="button">
            Submit
          </button>
          <p>
            Already Register ? <a href="/Login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
