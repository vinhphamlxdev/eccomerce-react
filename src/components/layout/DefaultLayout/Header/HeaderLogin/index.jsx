import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { TbLock } from "react-icons/tb";
import { QueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { EMAIL_REG_EXP } from "../../../../../common/constants";
import { loginUser } from "../../../../../services/AuthApi";
import {
  setAccessTokenAndRefreshToken,
  setRender,
} from "../../../../../store/auth/authSlice";
import Button from "../../../../Button";
import Error from "../../../../Error";
import { Input } from "../../../../Input";
import LoadingSpinner from "../../../../Loading/LoadingSreen";
const schemaValidate = Yup.object({
  emailOrPhone: Yup.string().required(
    "Vui lòng nhập email hoặc số điện thoại!"
  ),
  password: Yup.string().required("Vui lòng nhập mật khẩu!"),
});
export default function HeaderLogin() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  const {
    mutate: loginMutatetion,
    isPending,
    isLoading,
  } = useMutation({
    mutationFn: (reqest) => loginUser(reqest),
    onSuccess: (data) => {
      console.log("success:", data);
      const { accessToken, refreshToken } = data;
      dispatch(setAccessTokenAndRefreshToken({ accessToken, refreshToken }));
      reset();
      toast.success("Đăng  nhập thành công!");
      dispatch(setRender());
      // setRender((prevRender) => !prevRender);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Đăng nhập thất bại!");
    },
  });
  const handleLogin = (data) => {
    const { emailOrPhone, password } = data;
    const key = EMAIL_REG_EXP.test(emailOrPhone) ? "email" : "phone";
    const formData = {
      [key]: emailOrPhone,
      password: password,
      mfaCode: "",
    };
    loginMutatetion(formData);
  };
  return (
    <Fragment>
      {isSubmitting && <LoadingSpinner />}
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="p-2 bg-[#DBDBDB] header-signin col-span-3 rounded-sm flex flex-col gap-y-2"
      >
        <div className="flex  justify-between items-center">
          <div className="flex w-[128px] flex-shrink-0 gap-x-2   items-center">
            <i className="bi text-[#003B4F] text-lg bi-person"></i>
            <span className="text-sm text-red-800">Tài khoản</span>
          </div>
          <div className="relative flex-1">
            <Input
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                backgroundColor: "#fff",
              }}
              control={control}
              name="emailOrPhone"
              type="email"
              placeholder="Email hoặc điện thoại"
            />

            <Error isRequired={false} error={errors?.emailOrPhone?.message} />
          </div>
        </div>
        <div className="flex  justify-between items-center">
          <div className="flex w-[128px] gap-x-2  items-center">
            <i className="bi text-[#003B4F] text-lg bi-key"></i>
            <span className="text-sm text-red-800">Mật khẩu</span>
          </div>
          <div className="relative flex-1">
            <Input
              style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                backgroundColor: "#fff",
              }}
              control={control}
              name="password"
              type="password"
              placeholder="Mật khẩu"
            />
            <Error isRequired={false} error={errors?.password?.message} />
          </div>
        </div>
        <div className="flex items-center ">
          <div className="w-[128px] flex-shrink-0">
            <Link
              to={"/forgot-password"}
              className="text-gray-500 transition-all hover:opacity-75 cursor-pointer"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative flex flex-1 justify-start">
            <Button
              type="submit"
              className=" bg-primaryBtn btn-login"
              title="Đăng Nhập"
            >
              <TbLock className="text-secondary text-lg" />
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
