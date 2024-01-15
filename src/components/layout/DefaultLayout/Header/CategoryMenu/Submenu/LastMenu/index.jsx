import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function LastMenu({ data }) {
  return (
    <button className="bg-[#ECECEC] hover:bg-white transition-all border-solid select-none  text-[##002343] py-1 rounded-sm flex items-center pr-3 pl-7 gap-x-1">
      <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
      <span className="text-sm">{data?.name}</span>
    </button>
  );
}
