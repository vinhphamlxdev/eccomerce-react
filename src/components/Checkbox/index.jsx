import React from "react";
import styled from "styled-components";
export default function CheckBox({
  checked,
  onChange,
  name = "",
  label = "",
  register,
}) {
  return (
    <StyledCheckBox className="form-checkbox flex items-center gap-x-3">
      <input
        {...register(name)}
        name={name}
        className=""
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={name}
      />
      <label className="text-sm cursor-pointer select-none" htmlFor={name}>
        {label}
      </label>
    </StyledCheckBox>
  );
}
const StyledCheckBox = styled.div``;
