import React from "react";

export default function OrderItem({ product, index }) {
  const { id, name, price, quantity, image } = product;
  return (
    <div className="invoice-grid">
      <div className="invoice-item__header">
        <span>{index + 1}</span>
      </div>
      <div className="invoice-item__header">
        <img
          src="https://thegioidien.com/hmhB/E8332RJS5_WG_G19714880800.jpg"
          alt=""
        />
      </div>
      <div className="invoice-item__header">
        <span>Bộ 2 ổ cắm mạng cat5e</span>
      </div>
      <div className="invoice-item__header caculate-total">
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex items-center w-full justify-between">
            <span>ĐVT: Cái</span>
            <div className="flex gap-x-[3px] items-center">
              <span className="text-red-500 text-sm">X</span>
              <span className="mb-1">2</span>
            </div>
          </div>
          <div className="flex items-center w-full justify-between">
            <span>Đơn giá</span>
            <div className="flex gap-x-[3px] items-center">
              <span className="text-gray-700 text-sm">445.700</span>
            </div>
          </div>
          <div className="flex items-center w-full justify-end gap-x-2">
            <span className="text-red-500">=</span>
            <span className="text-gray-700 text-sm">891.400</span>
          </div>
        </div>
      </div>
    </div>
  );
}
