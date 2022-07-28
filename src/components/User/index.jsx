import React, { useState } from "react";
import "./user.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  userHndlerData,
  userupdateHandlerData,
} from "../../service/auth.service";
// import { validName, validPhoneno, validEmail } from "../../utils/helper";

export default function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [fnameErr, setfnameErr] = useState(false);
  const [lnameErr, setlnameErr] = useState(false);
  const [phonenoErr, setphonenoErr] = useState(false);
  const [msg, setMsg] = useState(false);
  const [selected, setSelected] = useState(false);
  const [userData, setuserData] = useState([]);
  const location = useLocation();
  const [uid, setuid] = useState();
  const { search } = location;

  useEffect(() => {
    let userId;
    if (search.split("=").length > 0) {
      userId = search.split("=")[1];
    } else {
      userId = "";
    }
    getuserData(userId);// eslint-disable-next-line 
  }, []);

  const getuserData = async (userId) => {
    const response = await userHndlerData(userId);
    setuserData(response.data?.data);
    setuid(response.data?.data._id);
  };
  const validate = () => {
    let formIsValid = true;
    // if (!validEmail.test(email)) {
    //   formIsValid = false;
    //   setEmailErr("Your Email is invalid");
    // }
    // if (!validName.test(firstName)) {
    //   formIsValid = false;
    //   setfnameErr("Your First Name is invalid");
    // }
    // if (!validName.test(lastName)) {
    //   formIsValid = false;
    //   setlnameErr("Your Last Name is invalid");
    // }
    // if (!validPhoneno.test(phoneNumber)) {
    //   formIsValid = false;
    //   setphonenoErr("Your Phone No is invalid");
    // }

    // if (!email) {
    //   formIsValid = false;
    //   setEmailErr("Your Email is required");
    // }
    // if (!firstName) {
    //   formIsValid = false;
    //   setfnameErr("Your First Name is required");
    // }
    // if (!lastName) {
    //   formIsValid = false;
    //   setlnameErr("Your Last Name is required");
    // }
    // if (!phoneNumber) {
    //   formIsValid = false;
    //   setphonenoErr("Your Phone No is required");
    // }

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

  const postData = async (event, id) => {
    event.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    const response = await userupdateHandlerData(uid, body); // eslint-disable-next-line
    if (response.status == "200") {
      setSelected(false);
      setMsg("Updated successfully");
    }
    if (response.message) {
      setSelected(false);
    }
  };

  return (
    <>
      <div className="container text">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <div className="main-content">
                  <h4 className="main-heading main">Profile Settings</h4>
                </div>
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#profile"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded active"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user mr-2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                    Profile Information
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none">
                <ul
                  className="nav nav-tabs card-header-tabs nav-gap-x-1"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      href="#profile"
                      data-toggle="tab"
                      className="nav-link has-icon active"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body tab-content">
                <div className="tab-pane active" id="profile">
                  <h6>Your Profile Information</h6>
                  <hr />
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                    method="post"
                  >
                    <div className="form-group">
                      <label htmlFor="fullName">Firstname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="Firstname"
                        aria-describedby="fullNameHelp"
                        placeholder={`${userData.firstName}`}
                        value={firstName}
                        onChange={(e) => [
                          setFirstName(e.target.value),
                          setfnameErr(""),
                          setMsg(""),
                        ]}
                      />{" "}
                      {fnameErr && <p className="errorstyle">{fnameErr}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">Lastname</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        aria-describedby="fullNameHelp"
                        placeholder={`${userData.lastName}`}
                        value={lastName}
                        onChange={(e) => [
                          setLastName(e.target.value),
                          setlnameErr(""),
                          setMsg(""),
                        ]}
                      />{" "}
                      {lnameErr && <p className="errorstyle">{lnameErr}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="fullNameHelp"
                        placeholder={`${userData.email}`}
                        value={email}
                        onChange={(e) => [
                          setEmail(e.target.value),
                          setEmailErr(""),
                          setMsg(""),
                        ]}
                      />
                      {emailErr && <p className="errorstyle">{emailErr}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">Phone No:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        aria-describedby="fullNameHelp"
                        placeholder={`${userData.phoneNumber}`}
                        value={phoneNumber}
                        maxLength={10}
                        onChange={(e) => [
                          setphoneNumber(e.target.value),
                          setphonenoErr(""),
                          setMsg(""),
                        ]}
                      />
                      {phonenoErr && <p className="errorstyle">{phonenoErr}</p>}
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="fullName">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        aria-describedby="fullNameHelp"
                        placeholder={`${userData.password}`}
                        value={password}
                        onChange={(e) => [
                          setPassword(e.target.value),
                          setPasswordErr(""),
                          setMsg(""),
                        ]}
                      />
                      {passwordErr && (
                        <p className="errorstyle">{passwordErr}</p>
                      )}
                    </div> */}
                    <br />

                    <div className="row ">
                      <div className="col-4">
                        <button type="submit" className="button ">
                          {selected ? (
                            <div
                              class="spinner-border spinner-border-sm"
                              role="status"
                            />
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>

                      <div className="col-4">
                     
                      </div>
                      <div className="col-4 ">
                        <button
                          type="reset"
                          className="button"
                          onClick={(e) => setMsg("")}
                        >
                          Reset 
                        </button>
                      </div>
                      {msg && <p className="Sstyle">{msg}</p>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
