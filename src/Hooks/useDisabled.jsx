import * as React from "react";

export default function useDisabled(condition = false) {
  const isDisabled = React.useMemo(() => {
    return condition;
  }, [condition]);
  const disabledStyle = React.useMemo(() => {
    return {
      opacity: isDisabled ? "0.5" : "1",
      cursor: isDisabled ? "not-allowed" : "pointer",
    };
  }, [isDisabled]);
  return {
    isDisabled,
    disabledStyle,
  };
}
