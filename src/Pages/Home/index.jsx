import React from "react";
import Categories from "../../components/Categories";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import ProductList from "../../components/ProductList";
import TopLoading from "../../components/TopLoading";

export default function Home() {
  return (
    <>
      <TopLoading />
      <Navbar />
      <Dashboard />
      <Categories />
      <ProductList />
    </>
  );
}
