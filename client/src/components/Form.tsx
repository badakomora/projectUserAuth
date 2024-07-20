import React from "react";
import { FancyInput } from "./FancyInput";
import { FormProps, appcomp, notifications } from "./AppConfig";
import { FancyLink } from "./FancyLink";

export const Form: React.FC<notifications & appcomp & FormProps> = ({
  loginRegister,
  setLoginRegister,
  formname,
  onsubmit,
  phone,
  setPhone,
  password,
  setPassword,
  otp,
  setOtp,
  color,
  feedback,
}) => {
  return (
    <div className="loginWrap">
      <form onSubmit={onsubmit}>
        <span style={{ color: color }}>{feedback}</span>
        <h4>{formname}</h4>
        <FancyInput
          name={"Phone"}
          type={"tel"}
          value={phone}
          onchange={(e) => {
            e.preventDefault();
            setPhone(e.target.value);
          }}
          disabled={loginRegister === "newpassword" ? true : false}
          placeholder={"E.g +254712345678"}
        />
        {loginRegister === "newpassword" ? (
          <FancyInput
            name={"Enter OTP"}
            type={"number"}
            value={otp}
            onchange={(e) => {
              e.preventDefault();
              setOtp(e.target.value);
            }}
            disabled={false}
            placeholder={"Enter OTP"}
          />
        ) : (
          ""
        )}
        {loginRegister === "signin" ||
        loginRegister === "signup" ||
        loginRegister === "newpassword" ? (
          <FancyInput
            name={
              loginRegister === "signin" || loginRegister === "signup"
                ? "Password"
                : "Enter New Passsword"
            }
            type={"password"}
            value={password}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            disabled={false}
            placeholder={
              loginRegister === "signin" || loginRegister === "signup"
                ? "Password"
                : "Enter New Passsword"
            }
          />
        ) : (
          ""
        )}
        <button type="submit">{formname}</button>
        {loginRegister === "signin" ? (
          <FancyLink
            href={"Forgotpassword"}
            name={"Forget Password"}
            onclick={(e) => {
              e.preventDefault();
              setLoginRegister("forgotpassword");
            }}
          />
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
