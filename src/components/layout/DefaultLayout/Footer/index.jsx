import React from "react";
import styled from "styled-components";
import { AiOutlineThunderbolt } from "react-icons/ai";
import logo from "../../../../assets/bocongthuong.png";
import ftbg from "../../../../assets/ftbg.jpg";
import Button from "../../../Button";
const arrButton = [
  {
    title: "Trang chủ",
    icon: "bi-house",
  },
  {
    title: "Tài liệu kỹ thuật",
    icon: "bi-file-earmark-pdf",
  },
  {
    title: "Hướng dẫn",
    icon: "bi-question-circle",
  },
  {
    title: "Bảng giá sản phẩm",
    icon: "bi-database",
  },
  {
    title: "Liên hệ",
    icon: "bi-file-earmark-person",
  },
  {
    title: "Quy định - điều khoản sử dụng website",
    icon: "bi-file-earmark-text",
  },
];
const arrButton2 = [
  {
    title: "Công tắc ổ cắm và phụ kiện",
  },
  {
    title: "Phụ kiện tủ điện, vỏ tủ điện",
  },
  {
    title: "Dụng cụ cầm tay, dụng cụ tools",
  },
  {
    title: "Thiết bị chống sét, kim thu sét",
  },
  {
    title: "Điện dân dụng và phụ kiện",
  },
  {
    title: "Thiết bị đóng cắt, chống rò điện",
  },
  {
    title: "Đèn chiếu sáng - đèn trang trí",
  },
  {
    title: "Thiết bị điều khiển, tự động hóa",
  },
  {
    title: "ATS, MTS, UPS, cầu dao đảo",
  },
  {
    title: "Cáp điện, cáp tín hiệu - điều khiển",
  },
  {
    title: "Thiết bị điện trung thế, đường dây",
  },
  {
    title: "Biến áp, ổn áp, tụ bù, cuộn kháng",
  },
];
export default function Footer() {
  return (
    <StyledFooter className="footer-session bg-bgFooter">
      <div className="flex flex-wrap gap-y-3 justify-center items-center p-3 w-full gap-x-3">
        {new Array(6).fill(0).map((item, index) => (
          <Button
            key={index}
            title={arrButton[index].title}
            className="bg-bgbtn"
          >
            <i className={`bi ${arrButton[index].icon} text-secondary`} />
          </Button>
        ))}
      </div>
      <div className="flex justify-center items-center flex-wrap gap-y-2 p-3 w-full gap-x-3">
        {new Array(12).fill(0).map((item, index) => (
          <button
            key={index}
            className="bg-transparent hover:bg-white transition-all border-solid border-[#6A1300] border text-[#430B01 py-1 rounded-sm flex items-center px-2 gap-x-1"
          >
            <AiOutlineThunderbolt className="text-base text-[#B21E02]" />
            <span className="text-sm">{arrButton2[index].title}</span>
          </button>
        ))}
      </div>
      <div className="p-3 border-dotted border-t border-primary">
        <div className="flex justify-center items-center">
          <img className="h-[34px]" src={logo} alt="" />
        </div>
        <div className="flex items-center text-sm mt-3 flex-col justify-center">
          <span className="text-center">
            Bản quyền © 2008-2022 thuộc về thegioidien.com
          </span>
          <span className="text-center">
            Ghi rõ nguồn khi sử dụng các thông tin tại WWW.THEGIOIDIEN.COM.
          </span>
          <span className="text-center">
            WWW.THEGIOIDIEN.COM thuộc sở hữu và điều hành bởi Công ty TNHH Thế
            Giới Điện
          </span>
          <span className="text-center">
            Văn phòng giao dịch: 98D Linh Đông, Khu Phố 7, Phường Linh Đông,
            TP.Thủ Đức, TP.HCM
          </span>
          <span className="text-center">
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
  @media screen and (max-width: 768px) {
  }
`;
