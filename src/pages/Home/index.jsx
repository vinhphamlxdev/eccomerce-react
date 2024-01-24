import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import Post from "../../components/Post";
import SliderBrand from "../../components/SliderBrand";
import BreadCrumb from "../../components/BreadCrumb";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { getUserInfo } from "../../services/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/auth/authSlice";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../common/constants";

export default function Home() {
  return (
    <div className="home-page">
      <Product />
    </div>
  );
}
