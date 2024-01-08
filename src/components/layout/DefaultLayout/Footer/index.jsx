import React from "react";
import styled from "styled-components";
import { AiOutlineThunderbolt } from "react-icons/ai";
import logo from "../../../../assets/bocongthuong.png";
import ftbg from "../../../../assets/ftbg.jpg";
export default function Footer() {
  return (
    <StyledFooter className="footer-session bg-bgFooter">
      <div className="flex justify-center items-center p-3 w-full gap-x-3">
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-house"></i>
          <span className="text-sm">Trang chủ</span>
        </button>
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-file-earmark-pdf"></i>
          <span className="text-sm">Tài liệu kỹ thuật</span>
        </button>
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-question-circle"></i>
          <span className="text-sm">Hướng dẫn</span>
        </button>
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-database"></i>
          <span className="text-sm">Bảng giá sản phẩm</span>
        </button>
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-file-earmark-person"></i>
          <span className="text-sm">Liên hệ</span>
        </button>
        <button className="bg-bgbtn hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2">
          <i className="bi text-base text-secondary bi-file-earmark-text"></i>
          <span className="text-sm">Quy định - điều khoản sử dụng website</span>
        </button>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-y-2 p-3 w-full gap-x-3">
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Công Tắc Ổ Cắm và Phụ Kiện</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Phụ Kiện Tủ Điện, Vỏ Tủ Điện</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Dụng cụ cầm tay, Dụng Cụ Tools</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Thiết Bị Chống Sét, Kim Thu Sét</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Điện Dân Dụng và Phụ Kiện</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Thiết Bị Đóng Cắt, Chống Rò Điện</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Đèn Chiếu Sáng - Đèn Trang Trí</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Thiết Bị Điều Khiển, Tự Động Hóa</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">ATS, MTS, UPS, Cầu Dao Đảo</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Cáp Điện, Cáp Tín Hiệu - Điều Khiển</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Thiết Bị Điện Trung Thế, Đường Dây</span>
        </button>
        <button className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1">
          <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
          <span className="text-sm">Biến Áp, Ổn Áp, Tụ bù, Cuộn kháng</span>
        </button>
      </div>
      <div className="p-3 border-dotted border-t border-primary">
        <div className="flex justify-center items-center">
          <img className="h-[34px]" src={logo} alt="" />
        </div>
        <div className="flex items-center mt-3 flex-col justify-center">
          <span>Bản quyền © 2008-2022 thuộc về thegioidien.com</span>
          <span>
            Ghi rõ nguồn khi sử dụng các thông tin tại WWW.THEGIOIDIEN.COM.
          </span>
          <span>
            WWW.THEGIOIDIEN.COM thuộc sở hữu và điều hành bởi Công ty TNHH Thế
            Giới Điện
          </span>
          <span>
            Văn phòng giao dịch: 98D Linh Đông, Khu Phố 7, Phường Linh Đông,
            TP.Thủ Đức, TP.HCM
          </span>
          <span>
            GPKD: 0305921340 , Sở KHĐT TPHCM cấp ngày 23/08/2008. Địa chỉ: 32
            đường số 35, khu phố 2, phường Linh Đông, thành phố Thủ Đức, TP HCM
          </span>
        </div>
      </div>
    </StyledFooter>
  );
}
const StyledFooter = styled.div`
  background-image: url(${ftbg});
  background-repeat: repeat;
  border-bottom: 8px solid #540f00;
`;
