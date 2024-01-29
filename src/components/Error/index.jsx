import React from "react";

export default function Error({
  error = "",
  isRequired = true,
  className = "",
}) {
  return (
    <div
      className={`text-xs form-error font-normal flex gap-x-2 items-center text-errBg ${className}`}
    >
      {isRequired && (
        <span className="is-required text-errBg error-required">* </span>
      )}
      {error}
    </div>
  );
}
