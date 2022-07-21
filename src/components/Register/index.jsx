import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  suceessUser,
  validName,
  validPaasword,
  validPhoneno,
  validEmail,
} from "../../utils/helper";
import { userHandlerData } from "../../service/auth.service";

// import { sendData } from "../../services/authservices";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [fnameErr, setfnameErr] = useState(false);
  const [lnameErr, setlnameErr] = useState(false);
  const [phonenoErr, setphonenoErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  // const [fromdata, setformData] = useState([]);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let formIsValid = true;
    if (!validEmail.test(email)) {
      formIsValid = false;
      setEmailErr("Your Email is invalid");
    }
    if (!validName.test(firstName)) {
      formIsValid = false;
      setfnameErr("Your First Name is invalid");
    }
    if (!validName.test(lastName)) {
      formIsValid = false;
      setlnameErr("Your Last Name is invalid");
    }
    if (!validPhoneno.test(phoneNumber)) {
      formIsValid = false;
      setphonenoErr("Your Phone No is invalid");
    }
    if (!validPaasword.test(password)) {
      formIsValid = false;
      setPasswordErr("Your Password is invalid");
    }

    if (!email) {
      formIsValid = false;
      setEmailErr("Your Email is required");
    }
    if (!firstName) {
      formIsValid = false;
      setfnameErr("Your First Name is required");
    }
    if (!lastName) {
      formIsValid = false;
      setlnameErr("Your Last Name is required");
    }
    if (!phoneNumber) {
      formIsValid = false;
      setphonenoErr("Your Phone No is required");
    }
    if (!password) {
      formIsValid = false;
      setPasswordErr("Your Password is required");
    }

    return formIsValid;
  };
  // const handleSubmit = (e) => {
  //   if (validate() !== true) {
  //   } else {
  //     alert(firstname);
  //     localStorage.setItem("username", JSON.stringify(firstname));
  //     localStorage.setItem("role", JSON.stringify(lastname));
  //     localStorage.setItem("email", JSON.stringify(email));
  //     localStorage.setItem("mobileNumber", JSON.stringify(phoneno));
  //     localStorage.setItem("password", JSON.stringify(password));
  //   }
  //   e.preventDefault();

  //   const details = {
  //     username: firstname,
  //     role: lastname,
  //     email: email,
  //     phoneNumber: phoneno,
  //     password: password,
  //   };
  //   allData.push(details);
  //   console.log(allData);
  //   //  sendData(allData);

  //   // sendData(localStorage);
  // };
  // const isButtonSelected = (value) => {
  //   if (selected === value) {
  //     return true;
  //   }
  // };
  // const onChange = (e) => {
  //   setSelected(e.target.value);
  // };

  const handleSubmit = (e) => {
    if (validate() !== true) {
    } else {
      postData(e);
      setSelected(true);
    }
    e.preventDefault();
  };

  const postData = async (event) => {
    event.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    };
    const response = await userHandlerData(body); // eslint-disable-next-line
    if (response.status == "200") {
      navigate(`/Verify?cid=${response.data.data._id}`);
      suceessUser("Verification email sent successfully!");
    }
  };

  return (
    <div className="back">
      <div className="registercontainer ">
        <img
          className="logo"
          src="/images/frontendlogo.svg"
          alt="FRONTENDLOGO"
        />
        <div className="row">
          <div className="col-2">
            <img className="loginbg" src="/images/loginbg.svg" alt="Register" />
          </div>
          <form
            className="form col-1 scaled "
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            name=""
            method="post"
          >
            <div>
              <h2>Sign Up</h2>
            </div>
            <div className="container">
              <div className="row justify-content-start">
                <div className="col">
                  <label className="form-label">Firstname</label>
                  <div className="form-floating mb-1">
                    <input
                      className="form-control"
                      placeholder="Enter Your Frist Name"
                      type="text"
                      name="Firstname"
                      maxLength={15}
                      id="Firstname"
                      value={firstName}
                      onChange={(e) => [
                        setFirstName(e.target.value),
                        setfnameErr(""),
                      ]}
                    />
                    <label htmlFor="fristnameErr">Enter Your Frist Name</label>
                    {fnameErr && <p className="errorstyle">{fnameErr}</p>}
                  </div>
                </div>

                <div className="col">
                  <label className="form-label">Lastname</label>
                  <div className="form-floating mb-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter user if you are a user"
                      name="role"
                      maxLength={15}
                      id="lastnameErr"
                      value={lastName}
                      onChange={(e) => [
                        setLastName(e.target.value),
                        setlnameErr(""),
                      ]}
                    />
                    <label htmlFor="user">Enter Your Last Name</label>
                    {lnameErr && <p className="errorstyle">{lnameErr}</p>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">E-mail</label>
                  <div className="form-floating mb-1">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Enter Email"
                      name="email"
                      id="emailErr"
                      value={email}
                      onChange={(e) => [
                        setEmail(e.target.value),
                        setEmailErr(""),
                      ]}
                    />
                    <label htmlFor="emailErr">Enter Your Email Address</label>
                    {emailErr && <p className="errorstyle">{emailErr}</p>}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Phone No.
                  </label>
                  <div className="form-floating mb-1">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="name@example.com"
                      id="phonenoErr"
                      value={phoneNumber}
                      maxLength={10}
                      onChange={(e) => [
                        setphoneNumber(e.target.value),
                        setphonenoErr(""),
                      ]}
                    />
                    <label htmlFor="phonenoErr">Enter Your Phone Number</label>
                    {phonenoErr && <p className="errorstyle">{phonenoErr}</p>}
                  </div>
                </div>
              </div>
              <label className="form-label">Password</label>
              <div className="form-floating mb-1">
                <input
                  type="current-password"
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
                <label htmlFor="passwordErr">Enter Your Password</label>
                {passwordErr && <p className="errorstyle">{passwordErr}</p>}
              </div>
              <div className="mb-1"></div>
              <button type="submit" className="button">
                {selected ? (
                  <div class="spinner-border" role="status" />
                ) : (
                  "Sign up"
                )}
              </button>

              <p>
                Already Register ?
                <Link className="text" to="/Login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
