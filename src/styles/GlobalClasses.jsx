import { css } from "styled-components";
export const GlobalClasses = css`
  .wrapper-layout {
    max-width: 1300px;
    margin: auto;
    background-color: #faedcd;
  }
  .label {
    color: #3b3b3b;
    line-height: 1.4;
    font-size: 1rem;
  }
  .app {
    background-color: #fff;
  }
  .grid {
    display: grid;
    grid-gap: 1rem !important;
  }

  .pb-session {
    padding-bottom: 16px;
  }
  .pt-session {
    padding-top: 16px;
  }
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slick-slider {
    margin: 0 -4px;
  }
  .slick-list {
    & .slick-slide {
      padding: 0 4px;
    }
  }
  .slick-dots {
    bottom: -40px;
  }
  .slick-dots li button:before {
    color: #415a77;
    font-size: 18px;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before {
    color: #f51c1c;
    opacity: 1;
  }
  .slick-dots li.slick-active button:before {
    color: #f51c1c;
    opacity: 1;
  }
  .tippy-box {
    font-size: 11px;
  }
  .tippy-content {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .swal2-container.swal2-top,
  .swal2-container.swal2-center,
  .swal2-container.swal2-bottom {
    z-index: 9999;
  }
  .btn-increase,
  .btn-decrease {
    line-height: 0;
    font-weight: 300;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border: 1px solid rgb(228, 228, 228);
    cursor: pointer;
    text-align: center;
    width: 40px;
    height: 40px;
    transition: all 0.4s ease-in-out 0s;
    background-color: #f5f5f5;
  }
  .slick-list .slick-slide > div {
    display: flex;
  }
  .swal2-container.swal2-center > .swal2-popup {
    user-select: none;
  }
  .has-scrollbar {
    will-change: scroll-position;
    scroll-behavior: smooth;
    overflow: hidden overlay;
    &::-webkit-scrollbar {
      width: 4px;
      display: none;
    }
    &:hover::-webkit-scrollbar {
      width: 4px;
      display: inline-block;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 12px;
      background: #b7b7a4;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    background-color: #b21e02;
    color: #fff;
  }
  select {
    width: 100%;
    outline: none;
    background-color: transparent;
    border: 1px solid #e4e4e4;
    border-radius: 2px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
  }
  select:focus {
    border: 1px solid #000;
  }
  @media screen and (max-width: 1200px) {
    .product-logo__list {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }

    .viewmore-button {
      display: flex;
    }
    .viewmore-btn {
      text-decoration: none;
      background-color: #b21e02;
      background-image: linear-gradient(
        to bottom,
        #b21e02,
        #b21e02,
        #b93016,
        #b21e02,
        #b21e02
      );
      border-radius: 3px;
      color: #ededed;
      display: flex;
      align-items: center;
      padding: 0.5rem 0.7rem;
    }
  }
`;
