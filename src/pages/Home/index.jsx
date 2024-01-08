import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import Post from "../../components/Post";
import SliderBrand from "../../components/SliderBrand";

export default function Home() {
  return (
    <div className="home-page">
      <Product />
      <SliderBrand />
      <Post />
    </div>
  );
}
