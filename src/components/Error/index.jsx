import React from "react";

export default function Error({ error = "", isRequired = true }) {
  return (
    <div className="text-xs form-error font-normal flex gap-x-2 items-center text-errBg">
      {isRequired && <span className="is-required text-errBg">* </span>}
      {error}
    </div>
  );
}
