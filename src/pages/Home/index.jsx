import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import Post from "../../components/Post";
import SliderBrand from "../../components/SliderBrand";
import BreadCrumb from "../../components/BreadCrumb";

export default function Home() {
  return (
    <div className="home-page">
      <Product />
    </div>
  );
}
