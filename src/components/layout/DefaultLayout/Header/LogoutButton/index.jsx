import React from "react";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
} from "../../../../../common/constants";
import { useMutation, useQueryClient } from "react-query";
import { logoutUser } from "../../../../../services/AuthApi";
import { useDispatch } from "react-redux";
import { setClearUser, setUserInfo } from "../../../../../store/auth/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../Loading/LoadingSreen";
const objKeys = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
};
export default function LogoutButton() {
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (tokenUser) => logoutUser(tokenUser),
    onSuccess: () => {
      dispatch(setClearUser());
      console.log("logout success");
      toast.success("Đăng xuất thành công!");
      for (const key in objKeys) {
        localStorage.removeItem(objKeys[key]);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const handleLogoutUser = () => {
    mutation.mutate(token);
  };
  return (
    <>
      {mutation.isLoading && <LoadingSpinner />}
      <button
        onClick={handleLogoutUser}
        className="signup-btn  items-center flex gap-x-2 bg-[#B21E02] text-[#F1F3E4] py-2 px-2 text-sm"
      >
        <IoIosLogOut className="text-[#FFFF00] text-base " />
        <span>Thoát</span>
      </button>
    </>
  );
}
