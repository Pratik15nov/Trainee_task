import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
// import { useEffect } from "react";
// import { useState } from "react";

export default function App() {
  // const [count, setCount] = useState([]);
  // useEffect(() => {
  //   countFunc();
  // }, []);
  // const countFunc = () => {
  //   setCount(JSON.parse(localStorage.getItem("Data")).length);
  // };

  const count = JSON.parse(localStorage.getItem("Data")) || [];
  console.log(count);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar count={count} />
                <Dashboard />
                <Categories />
                <ProductList />
              </>
            }
          />
          <Route
            path="/Cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />
          <Route
            path="/Categories"
            element={
              <>
                <Navbar />
                <Categories />
              </>
            }
          />
          <Route
            path="/Products"
            element={
              <>
                <Navbar />
                {/* <ProductList /> */}
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
