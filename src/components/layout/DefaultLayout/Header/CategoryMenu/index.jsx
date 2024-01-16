import React, { useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Submenu from "./Submenu";

export default function CategoryMenu({ data }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  return (
    <div className="relative category-menu__item">
      <div
        onClick={() => setShowSubmenu(!showSubmenu)}
        className="py-[2px] px-3 cursor-pointer transition-all hover:bg-[#B82F15] text-white bg-bgCategoryItem mb-[1px] flex justify-between items-center"
      >
        <div className="flex items-center gap-x-3">
          <i className="bi pointer-events-none text-base text-white cursor-pointer bi-caret-right-fill"></i>
          <div className="text-white hover:bg-[#0000CC] inline-block px-2 py-2 text-base">
            {data?.name}
          </div>
        </div>
        <i
          className={`bi text-white  cursor-pointer pointer-events-none ${
            showSubmenu ? "bi-chevron-up text-base" : "bi-plus text-xl"
          }`}
        ></i>
      </div>
      {showSubmenu ? (
        data?.children?.map((item, index) => {
          return <Submenu key={index} data={item} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
}
