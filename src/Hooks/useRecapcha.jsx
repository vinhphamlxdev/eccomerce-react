import React, { useState, useCallback } from "react";

function useRecaptcha() {
  const [reCapchaValue, setReCapchaValue] = React.useState("");
  const [recaptchaExpired, setRecaptchaExpired] = React.useState(true);
  const handleRecapchaChange = (value) => {
    setReCapchaValue(value);
    if (!value) {
      setRecaptchaExpired(true);
      setReCapchaValue("");
    } else {
      setRecaptchaExpired(false);
    }
  };
  const handleExpiredRecapcha = () => {
    setRecaptchaExpired(true);
    setReCapchaValue("");
    console.log(
      "reCAPTCHA expired. Please refresh and try again.",
      recaptchaExpired
    );
  };

  return {
    reCapchaValue,
    recaptchaExpired,
    handleRecapchaChange,
    handleExpiredRecapcha,
  };
}

export default useRecaptcha;
