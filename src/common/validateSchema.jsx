import * as Yup from "yup";
import {
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
  REGEX_New_PASSWORD,
  REGEX_PASSWORD,
} from "./constants";

export const registerValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!"),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, "Vui lòng nhập đúng định dạng số điện thoại!")
    .required("Vùi lòng nhập số điện thoại!"),
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
  passwordConfirm: Yup.string()
    .required("Vui lòng xác nhận mật khẩu!")
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không đúng!"),
  address: Yup.string().required("Vui lòng nhập địa chỉ!"),
  provinceAddress: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  districtAddress: Yup.string().required("Vui lòng chọn quận huyện!"),
  agreeTerms: Yup.boolean().oneOf([true], "Vui lòng đồng ý để tiếp tục!"),
});

export const loginValidate = Yup.object({
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
});
export const buynowValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!"),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, "Vui lòng nhập đúng định dạng số điện thoại!")
    .required("Vùi lòng nhập số điện thoại!"),
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  address: Yup.string().required("Vui lòng nhập địa chỉ!"),
  provinceAddress: Yup.string().required("Vui lòng chọn tỉnh thành!"),
  districtAddress: Yup.string().required("Vui lòng chọn quận huyện!"),
  agreeTerms: Yup.boolean().oneOf([true], "Vui lòng đồng ý để tiếp tục!"),
});
//change password
export const changePasswordValidate = Yup.object({
  oldPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu cũ!")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
  newPassword: Yup.string()
    .required("Vui lòng nhập mật khẩu mới!")
    .matches(
      REGEX_New_PASSWORD,
      "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt!"
    ),
  newPasswordConfirm: Yup.string()
    .required("Vui lòng xác nhận mật khẩu mới!")
    .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không đúng!"),
});

//comment validate
export const commentValidate = Yup.object({
  fullName: Yup.string().required("Vui lòng nhập họ tên!"),
  email: Yup.string()
    .matches(EMAIL_REG_EXP, "Email không đúng định dạng!")
    .required("Vui lòng nhập email!"),
  content: Yup.string().required("Vui lòng nhập nội dung!"),
});
