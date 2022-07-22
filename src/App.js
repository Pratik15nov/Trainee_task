import React from "react";
// import { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import Allproducts from "./components/AllProducts";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Verify from "./components/Verify";
import ForgotPassword from "./components/forgotPassword";
var isLoggedIn = localStorage.getItem("accessToken");
console.log(isLoggedIn);
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Dashboard />
                <Categories />
                <ProductList />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Cart"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Cart />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Categories"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Categories />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Products"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Allproducts />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Checkout"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Checkout />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Order"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Order />
              </>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
