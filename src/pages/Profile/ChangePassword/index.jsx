import React from "react";
import Button from "../../../components/Button";
import { changePasswordValidate } from "../../../common/validateSchema";
import { useForm } from "react-hook-form";

export default function ChangePassword({ setIsEdit }) {
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(changePasswordValidate),
  });
  const handleChangePassword = async (data) => {
    console.log(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="change-password flex flex-col"
    >
      <Field style={{ marginBottom: "8px" }}>
        <div className="label">Mật khẩu cũ</div>
        <div className="relative w-full mt-1">
          <Input name="oldPassword" control={control} />
          <span className="absolute text-errBg text-sm right-[-10px] top-0">
            *
          </span>
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.oldPassword?.message}
        </span>
      </Field>
      <Field style={{ marginBottom: "8px" }}>
        <div className="label">Mật khẩu mới</div>
        <div className="relative w-full mt-1">
          <Input name="newPassword" control={control} />
          <span className="absolute text-errBg text-sm right-[-10px] top-0">
            *
          </span>
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.newPassword?.message}
        </span>
      </Field>
      <Field style={{ marginBottom: "8px" }}>
        <div className="label">Xác nhận mật khẩu mới</div>
        <div className="relative w-full mt-1">
          <Input name="newPasswordConfirm" control={control} />
          <span className="absolute text-errBg text-sm right-[-10px] top-0">
            *
          </span>
        </div>
        <span className="text-xs font-normal text-red-600">
          {errors?.newPasswordConfirm?.message}
        </span>
      </Field>
      <div className="mt-3 flex justify-center gap-x-4">
        <Button type="submit" title="Cập nhật">
          <RxUpdate className="text-secondary text-base" />
        </Button>
        <Button
          onClick={() =>
            setIsEdit((prev) => ({
              ...prev,
              isChangePassword: false,
            }))
          }
          title="Hủy"
        >
          <IoClose className="text-secondary text-base" />
        </Button>
      </div>
    </form>
  );
}
