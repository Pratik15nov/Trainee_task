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
import Confirmpassword from "./components/Confirmpassword";
import ProtectedRoute from "./components/protectedRoutes";
import Successmail from "./components/successmail";
import User from "./components/User";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route exact path="/cart" element={<ProtectedRoute />}>
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Cart />
              </>
            }
          />
        </Route>
        <Route
          path="/categories"
          element={
            <>
              <Navbar />
              <Categories />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Allproducts />
            </>
          }
        />
        <Route exact path="/checkout" element={<ProtectedRoute />}>
          <Route
            path="/checkout"
            element={
              <>
                <Navbar />
                <Checkout />
              </>
            }
          />
        </Route>
        <Route exact path="/order" element={<ProtectedRoute />}>
          <Route
            path="/order"
            element={
              <>
                <Navbar />
                <Order />
              </>
            }
          />
        </Route>
        <Route exact path="/user" element={<ProtectedRoute />}>
          <Route
            path="/user"
            element={
              <>
                <Navbar />
                <User />
              </>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />

        <Route path="/verify" element={<Verify />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/confirmpassword" element={<Confirmpassword />} />
        <Route path="/successmail" element={<Successmail />} />
      </Routes>
    </BrowserRouter>
  );
}
