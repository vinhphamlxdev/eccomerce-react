import React from "react";

export default function Post() {
  return (
    <div className="pb-session post-session grid grid-cols-3 gap-x-3">
      <div className="post-item bg-[#EDEDED] border-b-[3px] border-solid border-[#94AAB1] flex flex-col">
        <div className="post-item__heading flex justify-center items-center bg-primary p-2 gap-x-3">
          <i className="bi bi-question-circle text-secondary"></i>
          <span className="text-white text-base font-medium">
            Hướng dẫn - Câu hỏi thường gặp
          </span>
        </div>
        <div className="grid grid-cols-2 py-4 px-2 gap-x-2 gap-y-3">
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/images065020878382724388.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Hướng dẫn Mua hàng tại thegioidien.com
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/thumbdtol387466875684802678.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Hướng dẫn Mua hàng tại thegioidien.com
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/deliveronline874452207738500505.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Hướng dẫn Mua hàng tại thegioidien.com
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/thumbdtol387466875684802678.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Hướng dẫn Mua hàng tại thegioidien.com
            </span>
          </div>
        </div>
      </div>
      <div className="post-item bg-[#EDEDED] border-b-[3px] border-solid border-[#94AAB1] flex flex-col">
        <div className="post-item__heading flex justify-center items-center bg-primary p-2 gap-x-3">
          <i className="bi bi-file-earmark-pdf text-secondary"></i>
          <span className="text-white text-base font-medium">
            Tài liệu kỹ thuật
          </span>
        </div>
        <div className="grid grid-cols-2 py-4 px-2 gap-x-2 gap-y-3">
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/OBO856733101777067034.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              OBO - Chống sét lan truyền
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/cadivi548476014643563814.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Hướng dẫn sử dụng cáp điện Cadivi trong xây dựng
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/rudolf806502385882074122.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Rudolf - Rơle bảo vệ, đồng hồ đo, biến dòng...
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/CadiviChonCap400101323067038642.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Cadivi - Dây & Cáp Điện
            </span>
          </div>
        </div>
      </div>
      <div className="post-item bg-[#EDEDED] border-b-[3px] border-solid border-[#94AAB1] flex flex-col">
        <div className="post-item__heading flex justify-center items-center bg-primary p-2 gap-x-3">
          <i className="bi bi-file-earmark-pdf text-secondary"></i>
          <span className="text-white text-base font-medium">
            Tài liệu kỹ thuật
          </span>
        </div>
        <div className="grid grid-cols-2 py-4 px-2 gap-x-2 gap-y-3">
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/Mennekes181728460066052280268475215.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Bảng giá ổ cắm công nghiệp Mennekes mới nhất đang áp dụng
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/Panasonic_chieusang263271718838585467.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Bảng giá thiết bị chiếu sáng Panasonic mới nhất đang áp dụng
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/LS_TuDong026710642466227447.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Bảng giá thiết bị tự động LS mới nhất đang áp dụng
            </span>
          </div>
          <div className="flex flex-col gap-y-2">
            <img
              src="https://thegioidien.com/hmhNews/Broyce%20Control772846571238628403.jpg"
              alt=""
            />
            <span className="text-sm text-[#000] leading-4">
              Bảng giá rơle bảo vệ Broyce control mới nhất đang áp dụng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
