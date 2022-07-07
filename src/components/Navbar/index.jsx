import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { EventEmitter } from "../../utils/helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PopularData } from "../../Data/PopularData";
import { DairyProducts } from "../../Data/DairyProductsData";
import { FootWear } from "../../Data/FootWearData";
import { ClothingWear } from "../../Data/ClothingWearData";
import { Accessories } from "../../Data/AccessoriesData";

export default function Navbar() {
  const storageData = JSON.parse(localStorage.getItem("Data"));
  const navigate = useNavigate();

  useEffect(() => {
    setCount(storageData ? storageData : []);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFunc = () => {
    EventEmitter.dispatch("PopularData", DairyProducts);
    navigate("/Products");
  };
  const pushPath = () => {
    navigate("/Cart");
  };
  const [count, setCount] = useState([]);

  EventEmitter.subscribe("DATA", (res) => {
    setCount(res);
  });

  EventEmitter.subscribe("DELETE", (res) => {
    setCount(res);
  });

  return (
    <nav className="flex align-center">
      <ul>
        <Link className="logo" to="/">
          <span>e</span>Commerce
        </Link>
      </ul>
      <ul>
        <li className="big-screens">
          <Link to="/">Home</Link>
          {/* */}

          <div className="list_categories">
            <Link to="/Categories">Categories</Link>
            <div className="dropdown_list">
              <div className="list_content">
                <p>All Products</p>
              </div>
              <div className="list_content">
                <p onClick={() => fetchFunc()}>Dairy Items</p>
              </div>
              <div className="list_content">
                <p>Clothing Wear</p>
              </div>
              <div className="list_content">
                <p>FootWears</p>
              </div>
              <div className="list_content">
                <p>Accessories</p>
              </div>
            </div>
          </div>

          {/* */}
          <Link to="/Products">Products</Link>
          <Link to="/Register">
            <button className="btn register">Register</button>
          </Link>
          <Link to="/Login">
            <button className="btn login">Log In</button>
          </Link>
          <Link to="/Cart">
            <span className="count">{count.length}</span>
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
          </Link>
          <Link to="/Account">
            <svg width="32" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
            </svg>{" "}
            Account
          </Link>
        </li>
        <li className="small-screens">
          <i className="fa-solid fa-bars" />
        </li>
      </ul>
      <div>
        <div className="ham_cart" onClick={() => pushPath()}>
          <span className="count">{count.length}</span>
          <svg
            className="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
          </svg>
        </div>
        <input type="checkbox" id="hamburger-input" />
        <label id="hamburger-menu" htmlFor="hamburger-input">
          <div id="sidebar-menu">
            <ul>
              <li>
                <svg width="32" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                </svg>{" "}
                Account
              </li>
              <li>
                <Link to="/Register">
                  <button className="ham_btn btn_register">Register</button>
                </Link>
              </li>
              <li>
                <Link to="/Login">
                  <button className="ham_btn btn_login">Log In</button>
                </Link>
              </li>
              <li>
                <Link to="/"> Home</Link>
              </li>
              <li>
                <Link to="/Categories"> Categories</Link>
              </li>
              <li>
                <Link to="/Products"> Products</Link>
              </li>
            </ul>
          </div>
        </label>
      </div>
    </nav>
  );
}
