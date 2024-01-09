import React from "react";

export default function Button({
  children,
  title = "",
  className = "",
  ...props
}) {
  return (
    <button
      className={` hover:opacity-75 transition-all text-white py-1 rounded-sm flex items-center px-3 gap-x-2 ${className}`}
    >
      {children}
      <span className="text-sm">{title}</span>
    </button>
  );
}
