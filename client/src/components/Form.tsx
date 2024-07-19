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
  color,
  feedback,
}) => {
  return (
    <div className="loginWrap">
      <form onSubmit={onsubmit}>
        <span style={{ color: color }}>{feedback}</span>
        <b>{formname}</b>
        <FancyInput
          name={"phone"}
          type={"phone"}
          value={phone}
          onchange={(e) => {
            e.preventDefault();
            setPhone(e.target.value);
          }}
        />
        {loginRegister === "signin" || loginRegister === "signup" ? (
          <FancyInput
            name={"Password"}
            type={"password"}
            value={password}
            onchange={(e) => {
              setPassword(e.target.value);
            }}
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
