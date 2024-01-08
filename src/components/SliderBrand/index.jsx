import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { brandData } from "./data";
export default function SliderBrand() {
  let slickProperty = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 12,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 15,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 15,
        },
      },
    ],
  };
  return (
    <StyledSlide className="pb-session">
      <div className="brand-session p-3 bg-[#83857A]">
        <Slider {...slickProperty}>
          {brandData.map((item) => {
            return (
              <div key={item.id} className="brand-item">
                <img src={item.img} className="brand-item__image" />
              </div>
            );
          })}
        </Slider>
      </div>
    </StyledSlide>
  );
}
const StyledSlide = styled.div`
  .brand-session {
    grid-template-columns: repeat(15, minmax(0, 1fr));
  }
`;
