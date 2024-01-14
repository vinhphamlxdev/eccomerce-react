import React from "react";

const Quantity = ({
  quantity = 1,
  setQuantity,
  handleIncrease,
  handleDecrease,
}) => {
  return (
    <div className="quantity-btn py-[2px] overflow-hidden flex bg-[#B5B5B4] rounded-sm">
      <button
        onClick={handleDecrease}
        className="btn-incre px-3 py-2 bg-[#B5B5B4] text-[#003B4F]"
      >
        <i className="bi text-[#003B4F] leading-[0px] text-base bi-dash-lg"></i>
      </button>
      <div className="bg-white">
        <input
          type="number"
          value={quantity}
          onChange={setQuantity}
          className="w-20 flex justify-center  text-center text-5 p-2 bg-white"
        />
      </div>
      <button
        onClick={handleIncrease}
        className="btn-incre px-3 py-2 bg-[#B5B5B4] text-[#003B4F]"
      >
        <i className="bi text-[#003B4F] leading-[0px] text-base bi-plus-lg"></i>
      </button>
    </div>
  );
};

export default React.memo(Quantity);
