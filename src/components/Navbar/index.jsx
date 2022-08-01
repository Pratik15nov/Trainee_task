import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import { EventEmitter } from "../../utils/helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listBody } from "../../utils/helper";
import { categoryHndlerData, cartHndlerData } from "../../service/auth.service";

export default function Navbar() {
  const [categoriesData, setcategoriesData] = useState([]);
  const [token, setToken] = useState();
  const [userData, setuserData] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setCount(storageData ? storageData : []);
    getcategoryData();
    setToken(localStorage.getItem("accessToken"));
    setuserData(JSON.parse(localStorage.getItem("userData")) || []);
    getcartproductData(userData.id);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // const [count, setCount] = useState([]);

  // EventEmitter.subscribe("DATA", (res) => {
  //   setCount(res);
  // });

  // EventEmitter.subscribe("DELETE", (res) => {
  //   setCount(res);
  // });
  const getcartproductData = async (log = "") => {
    const response = await cartHndlerData(
      listBody({
        where: { userId: log },
      })
    );
    setCart(response);
  };

  const getcategoryData = async () => {
    const response = await categoryHndlerData(
      listBody({ where: { isActive: true }, perPage: 1000 })
    );
    setcategoriesData(response);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top text">
      <Link className="logo" to="/">
        FrontendArmy<span>Shop</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to="/products"
              state={{ data: "seeall" }}
            >
              Products
            </Link>
          </li>
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Categories
            </div>
            <li className="dropdown-menu" aria-labelledby="dropdown01">
              {categoriesData?.map((card, index) => {
                return (
                  <Link
                    key={`category_${index}`}
                    to={`/products?cid=${card._id}`}
                    id={card._id}
                    state={{ data: `${card._id}` }}
                    // onClick={() => handleClick(card._id)}
                    className="dropdown-item"
                  >
                    {card.categoryName}
                  </Link>
                );
              })}
            </li>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/cart?uid=${userData.id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart-check"
                viewBox="0 0 16 16"
              >
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              <span className="cart__count">{cart.length}</span>
            </Link>
          </li>

          <li className="nav-item ">
            <Link
              className="nav-link"
              to={`/user?uid=${userData.id}`}
              style={{ display: token ? "block" : "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              onClick={logout}
              style={{ display: token ? "block" : "none" }}
              to="/login"
              className="nav-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="24"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </Link>
          </li>
          <li
            className="nav-item "
            style={{ display: token ? "none" : "block" }}
          >
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li
            className="nav-item "
            style={{ display: token ? "none" : "block" }}
          >
            <Link className="nav-link" to="/login">
              Log-In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
