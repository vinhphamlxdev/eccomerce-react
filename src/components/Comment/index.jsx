import React from "react";
import { commentValidate } from "../../common/validateSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import TextArea from "../TextArea";
import Error from "../Error";
import Button from "../Button";

export default function Comment() {
  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(commentValidate),
  });
  const handlePostComment = async (data) => {
    console.log(errors);
    console.log(data);
  };
  const handleInputChange = (e, keyName) => {
    const value = e.target.value;
    setFormValue(keyName, value);
  };
  return (
    <form
      onSubmit={handleSubmit(handlePostComment)}
      className="flex flex-col gap-y-3"
    >
      <div className="flex gap-x-3 field-container items-baseline">
        <div className="flex items-center form-field form-field__input gap-x-2">
          <div className="w-[320px]">
            <Input
              placeholder="Họ tên..."
              name="fullName"
              control={control}
              onChange={(e) => handleInputChange(e, "fullName")}
            />
          </div>
          <div className={`${errors?.fullName?.message ? "w-[166px]" : ""}`}>
            <span className="text-sm font-normal text-red-600">
              * {errors?.fullName?.message}
            </span>
          </div>
        </div>
        <div className="flex items-center form-field form-field__input  gap-x-2">
          <div className="w-[320px]">
            <Input
              placeholder="Email..."
              name="email"
              control={control}
              onChange={(e) => handleInputChange(e, "email")}
            />
          </div>
          <Error error={errors?.email?.message} />
        </div>
      </div>
      <div className="form-field field-textarea flex items-center gap-x-2">
        <TextArea control={control} placeholder="Nội dung..." name="content" />
        <Error error={errors?.content?.message} />
      </div>
      <div className="btn-send__comment">
        <Button
          isDisabled={isSubmitting}
          type="submit"
          title="Gửi đánh giá"
          className="bg-[#646461]"
        >
          <i className="bi text-secondary text-base bi-send-fill"></i>
        </Button>
      </div>
    </form>
  );
}
