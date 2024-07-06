import React from "react";
import { FancyInput } from "./FancyInput";
import { FormProps, appcomp, notifications } from "./AppConfig";
import { FancyLink } from "./FancyLink";

export const Form: React.FC<notifications & appcomp & FormProps> = ({
  loginRegister,
  formname,
  onsubmit,
  email,
  setEmail,
  password,
  setPassword,
  color,
  feedback,
  setForgetPassword,
}) => {
  return (
    <div className="loginWrap">
      <form onSubmit={onsubmit}>
        <span style={{ color: color }}>{feedback}</span>
        <b>{formname}</b>
        <FancyInput
          name={"Email"}
          type={"email"}
          value={email}
          onchange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <FancyInput
          name={"Password"}
          type={"password"}
          value={password}
          onchange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">{formname}</button>
        {loginRegister === "signin" ? (
          <FancyLink
            href={"Forgotpassword"}
            name={"Forget Password"}
            onclick={(e) => {
              e.preventDefault();
              setForgetPassword(true);
            }}
          />
        ) : (
          ""
        )}
      </form>
    </div>
  );
};