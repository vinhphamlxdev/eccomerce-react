import React from "react";

export default function Button({
  children,
  title = "",
  className = "",
  isDisabled = false,
  style = {},
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      style={style}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...props}
      className={` hover:opacity-75 transition-all  text-white py-1 rounded-sm flex items-center px-3 gap-x-1 ${className}`}
    >
      {children}
      <span className="text-sm whitespace-nowrap">{title}</span>
    </button>
  );
}
