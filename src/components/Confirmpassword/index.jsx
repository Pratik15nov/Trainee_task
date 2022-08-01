import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Register/Register.css";
// import { useNavigate } from "react-router";
import { validPaasword } from "../../utils/helper";
import { compassHandlerData } from "../../service/auth.service";

// import { sendData } from "../../services/authservices";

export default function Confirmpassword() {
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [compassword, setcomPassword] = useState("");
  const [compasswordErr, setcomPasswordErr] = useState(false);
  const [msg, setMsg] = useState(null);

  // const [fromdata, setformData] = useState([]);
  const [selected, setSelected] = useState(false);
  // const navigate = useNavigate();

  const validate = () => {
    let formIsValid = true;
    if (!validPaasword.test(password)) {
      formIsValid = false;
      setPasswordErr("Your password is invalid");
    }

    if (!password) {
      formIsValid = false;
      setPasswordErr("Your password is required");
    }
    if (!validPaasword.test(compassword)) {
      formIsValid = false;
      setcomPasswordErr("Your password is invalid");
    }

    // if (!compassword) {
    //   formIsValid = false;
    //   setcomPasswordErr("Your password is required");
    // }
    if (password !== compassword) {
      formIsValid = false;
      setcomPasswordErr("Your password do not match. please try again!");
    }

    return formIsValid;
  };

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
      password,
    };
    const response = await compassHandlerData(body); // eslint-disable-next-line
    if (response.status == "400") {
      // navigate(`/forgotPasword?uid=${response}`);

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
            <h2 className="text">New Password</h2>

            <div className="container">
              <div className="row">
                <div className="col">
                  <label className="form-label">Password</label>
                  <div className="form-floating mb-1">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Enter password"
                      name="password"
                      id="passwordErr"
                      value={password}
                      onChange={(e) => [
                        setPassword(e.target.value),
                        setPasswordErr(""),
                        setMsg(""),
                        setcomPasswordErr(""),
                      ]}
                    />
                    <label htmlFor="passwordErr">
                      Enter Your password Address
                    </label>
                    {passwordErr && <p className="errorstyle">{passwordErr}</p>}
                  </div>

                  <div className="form-floating mb-1">
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      placeholder="Enter password"
                      name="compassword"
                      id="compasswordErr"
                      value={compassword}
                      onChange={(e) => [
                        setcomPassword(e.target.value),
                        setcomPasswordErr(""),
                        setMsg(""),
                      ]}
                    />
                    <label htmlFor="passwordErr">Re-type Your Password</label>
                    {compasswordErr && (
                      <p className="errorstyle">{compasswordErr}</p>
                    )}
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
