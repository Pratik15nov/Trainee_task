import React from "react";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/productList"  element={<ProductList/>} />
          <Route path="/" element={<Login />} />
          <Route
            path="/Register"
            element={
              <>
                <Register />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
