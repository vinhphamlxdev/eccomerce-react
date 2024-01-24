export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const REGEX_New_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PHONE_REG_EXP = /^[0-9]{10}$/;
export const EMAIL_REG_EXP = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const RE_CAPCHA_KEY = import.meta.env.VITE_RE_CAPCHA_KEY;
export const USER = "user";
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
