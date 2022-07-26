import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Register/Register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { validEmail } from "../../utils/helper";
import { forgotpassHandlerData } from "../../service/auth.service";

// import { sendData } from "../../services/authservices";

export default function Register() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [msg, setMsg] = useState(null);

  // const [fromdata, setformData] = useState([]);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let formIsValid = true;
    if (!validEmail.test(email)) {
      formIsValid = false;
      setEmailErr("Your Email is invalid");
    }

    if (!email) {
      formIsValid = false;
      setEmailErr("Your Email is required");
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
      email,
    };
    const response = await forgotpassHandlerData(body); // eslint-disable-next-line
    if (response.status == "400") {
      navigate(`/forgotPasword?uid=${response}`);

      setSelected(false);
    }
    if (response.message) {
      setSelected(false);
    }
    console.log(response);
    setMsg(response.message);
  };

  return (
    <div className="back text">
      <div className="registercontainer ">
        <Link className="logo" to="/">
          <span>e</span>Commerce
        </Link>
        <div className="row">
          <div className="col-2">
            <img className="loginbg" src="/images/loginbg.svg" alt="Register" />
          </div>
          <form
            className="form col-1 scaled "
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            method="post"
          >
            <h2 className="text">Forgot Password</h2>

            <div className="container">
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
                        setMsg(""),
                      ]}
                    />
                    <label htmlFor="emailErr">Enter Your Email Address</label>
                    {emailErr && <p className="errorstyle">{emailErr}</p>}
                  </div>
                </div>
              </div>

              <div className="mb-1"></div>
              <button type="submit" className="button">
                {selected ? (
                  <div className="spinner-border" role="status" />
                ) : (
                  "Submit"
                )}
              </button>
              {msg && <p className="errorstyle">{msg}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
