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
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Verify from "./components/Verify";
import ForgotPassword from "./components/forgotPassword";
import ProtectedRoute from "./components/protectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            exact
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
        </Route>       
        <Route
          path="/cart"
          element={
            // isLoggedIn ? (
            <>
              <Navbar />
              <Cart />
            </>
            // ) : (
            //   <Login />
            // )
          }
        />
        <Route
          path="/categories"
          element={
            // isLoggedIn ? (
            <>
              <Navbar />
              <Categories />
            </>
            // ) : (
            //   <Login />
            // )
          }
        />
        <Route
          path="/products"
          element={
            // isLoggedIn ? (
            <>
              <Navbar />
              <Allproducts />
            </>
            // ) : (
            //   <Login />
            // )
          }
        />
        <Route
          path="/checkout"
          element={
            // isLoggedIn ? (
            <>
              <Navbar />
              <Checkout />
            </>
            // ) : (
            //   <Login />
            // )
          }
        />
        <Route
          path="/order"
          element={
            // isLoggedIn ? (
            <>
              <Navbar />
              <Order />
            </>
            // ) : (
            //   <Login />
            // )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
