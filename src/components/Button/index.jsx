import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  children,
  title = "",
  className = "",
  isDisabled = false,
  style = {},
  onClick,
  type = "button",
  to = "",
  ...props
}) {
  const ButtonContent = (
    <button
      style={style}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...props}
      className={` hover:opacity-75 transition-all bg-bgbtn  text-white py-1 rounded-sm flex items-center px-3 gap-x-1 ${className}`}
    >
      {children}
      <span className="text-sm whitespace-nowrap">{title}</span>
    </button>
  );

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent;
}
