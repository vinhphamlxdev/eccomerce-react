import * as React from "react";
import { styled } from "styled-components";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "../../components/Field";
import { Input } from "../../components/Input";
import useDisabled from "../../Hooks/useDisabled";
import axios from "axios";
import { LoadingButton } from "../../components/Loading";
// export const backgroundImageStyle = {
//   backgroundImage: `url(${bg})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   width: "100vw",
// };

const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schemaValidate = Yup.object({
  fullName: Yup.string().required("Please enter your full name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      REGEX_PASSWORD,
      "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters"
    ),
  passwordConfirm: Yup.string()
    .required("Please enter your password confirm!")
    .oneOf([Yup.ref("password")], "Confirmation password does not match!"),
});
export default function SignUp() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  console.log(errors);
  const handleSignUp = async (data) => {
    try {
      const newData = {
        title: "foo",
        body: "bar",
        userId: 1,
      };
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        newData
      );
      if (response.status === 201) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { disabledStyle, isDisabled } = useDisabled(isSubmitting);
  return (
    <div className="inset-0 bg-white relative  bg-signup gap-x-5">
      {/* {isLoading && <LoadingSpinner />} */}
      <div className="absolute px-10 left-10 top-5  py-10">
        <div></div>
      </div>
      <div className="wrapper-layout section">
        <div className="flex h-screen justify-center items-center">
          <div className="px-4 shadow-md py-6 flex flex-col w-[450px] sign-up-form  rounded-md bg-white">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col form-control  mt-4"
            >
              <div className="form-control__list">
                <div className="relative">
                  <Field>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      control={control}
                      error={errors.fullName?.message}
                    />
                  </Field>
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      control={control}
                      error={errors.email?.message}
                    />
                  </Field>
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      control={control}
                      error={errors.password?.message}
                    />
                  </Field>
                </div>
                <div className="relative">
                  <Field>
                    <Input
                      type="password"
                      name="passwordConfirm"
                      placeholder="Password confirm"
                      control={control}
                      error={errors.passwordConfirm?.message}
                    />
                  </Field>
                </div>
              </div>
              <button
                type="submit"
                disabled={isDisabled}
                style={disabledStyle}
                className="h-[50px] bg-bgCheckout whitespace-nowrap w-full bg-blue-500 text-white font-light rounded-md text-base undefined"
              >
                {isSubmitting ? <LoadingButton /> : <span>Đăng Kí</span>}
              </button>

              <div className="mt-3 flex items-center gap-x-3">
                <span className="text-textPrimary font-light">
                  Bạn đã có tài khoản?
                </span>
                <div
                  className="italic text-blue-500 text-sm cursor-pointer underline font-light"
                  //   href="/signin"
                >
                  Đăng Nhập
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
