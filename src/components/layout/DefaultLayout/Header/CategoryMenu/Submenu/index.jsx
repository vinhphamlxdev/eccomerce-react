import React, { useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import LastMenu from "./LastMenu";

export default function Submenu({ data }) {
  const [showLastMenu, setShowLastMenu] = useState(false);
  return (
    <div className="caterory-panel  bg-[#CBCBCB]  flex-col">
      <div
        onClick={() => setShowLastMenu(!showLastMenu)}
        className="py-[2px] pl-7 pr-3 cursor-pointer transition-all  text-white bg-[#646461] border-b border-[#F1FAFE] flex justify-between items-center"
      >
        <div className="flex justify-between items-center w-full caterory-panel__content">
          <div className="flex items-center gap-x-3">
            <i className="bi pointer-events-none text-base text-white cursor-pointer bi-chevron-right"></i>
            <div className="text-white select-none hover:bg-[#0000CC] inline-block px-2 py-2 text-base">
              {data?.name}
            </div>
          </div>
          <i
            className={`bi text-white  cursor-pointer pointer-events-none  ${
              showLastMenu ? "bi-chevron-up text-sm" : "bi-plus text-base"
            }`}
          ></i>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-x-[2px] gap-y-[2px]">
        {showLastMenu ? (
          data?.lastMenu?.map((item, index) => {
            return <LastMenu key={index} data={item} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
