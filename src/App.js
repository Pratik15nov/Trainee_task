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
import Allproducts from "./components/AllProducts";

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
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
              <Allproducts />
            </>
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
