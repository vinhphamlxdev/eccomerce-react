import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

export default function Select({
  data = [],
  onChange,
  control,
  name = "",
  register,
  label = "",
  value = "",
  ...props
}) {
  return (
    <SelectStyles className="field-select">
      <select
        value={value}
        {...register(name)}
        onChange={onChange}
        className="px-3 py-1"
        defaultValue=""
      >
        <option value="">-- {label}</option>
        {data?.length > 0 &&
          data.map((item, index) => {
            return (
              <option key={item.code} value={item.name}>
                {item.name}
              </option>
            );
          })}
      </select>
    </SelectStyles>
  );
}

const SelectStyles = styled.div`
  select {
    outline: none;
    background-color: transparent;
    border: 1px solid #888181;
    border-radius: 2px;
    transition: all 0.2s linear;
    color: #aaaaaa;
    font-size: 14px;
  }
  select:focus {
    border: 1px solid #fb8500;
  }
`;
