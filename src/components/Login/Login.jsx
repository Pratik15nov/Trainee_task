import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Login/Login.css";
import sideimage from "../Login/sideimage.svg";
import frontendlogo from "../Login/frontendlogo.svg";
import { validPaasword, validEmail } from "../helper";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {
  const [mail, setMail] = useState(" ");
  const [emailErr, setemailErr] = useState(false);

  const [pwd, setPwd] = useState(" ");
  const [pwdErr, setpwdErr] = useState(false);

  const validation = () => {
    let formIsValid = true;
    if (!validEmail.test(mail)) {
      formIsValid = false;
      setemailErr("INVAILD EMAIL");
    }
    if (!validPaasword.test(pwd)) {
      formIsValid = false;
      setpwdErr("iNVALID PAWSSWORD");
    }

    return formIsValid;
  };

  const handleSubmit = (e) => {
    if (validation() !== true) {
    } else {
      alert("done");
    }
    e.preventDefault();
    console.log("works");
  };

  return (
   <div  className="back" >
     <div >
      <div>
        <img className="image-conatiner" src={frontendlogo} alt="LOGO" />
      </div>  

      <div className="row grid-container ">
        <div className="col">
          <div>
            <img className="side-image" src={sideimage} alt="side img" />
          </div>
        </div>
        <div className="col">
          <div className="container form-conatiner">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className=" row row-col-1">
                <div className="row ">
                  <span className="credential-head">
                    <h2>Login </h2>
                  </span>{" "}
                </div>
                <div className="row">
                  <input
                    id="emailId"
                    type="email"
                    class="form-control m-2"
                    placeholder="Email"
                    name="email"
                    aria-describedby="addon-wrapping"
                    onChange={(e) => [
                      setMail(e.target.value),
                      setemailErr(" "),
                    ]}
                  />
                  {emailErr && <p className="validation">{emailErr}</p>}
                </div>
                <div className="row">
                  <input
                    type="password"
                    class="form-control m-2"
                    placeholder="Password"
                    name="password"
                    aria-describedby="addon-wrapping"
                    onChange={(e) => [setPwd(e.target.value), setpwdErr(" ")]}
                  />
                  {pwdErr && <p className="validation">{pwdErr}</p>}
                </div>
                <div className=" row  m-2 form-switch m-2 ">
                  <input className="form-check-input " type="checkbox" />
                  <label className="form-check-label"> REMEMBER ME </label>
                </div>
                <div className="row">
                  <button type="submit" class="BTN">
                    LOGIN
                  </button>
                </div>
                <div className="row">
                  <p>
                    <a href="/">Forgot password?</a>
                  </p>
                  <p>
                    New User?
                    <Link to="/Register">Register</Link>
                  </p>
                  <p>
                    <Link to="/productList">Go to Products</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    </div>
   </div>
    
  );
}
