/* eslint-disable react/jsx-no-comment-textnodes */
import { FancyInput } from "./FancyInput";
import { appcomp, notifications } from "./AppConfig";
import React from "react";


interface forgetpasswordprops{
    forgetPassword:boolean,
    setForgetPassword:React.Dispatch<React.SetStateAction<boolean>>
}

export const ForgotPassword: React.FC<forgetpasswordprops & notifications & appcomp> = ({
  email,
  setEmail,
  color,
  feedback,
  forgetPassword,
  setForgetPassword
}) => {




  // useEffect(() => {
  //   if (forgetPassword) {
  //     setForgetPassword(true);
  //   }
  // }, [forgetPassword, setForgetPassword]);


  const sendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="loginWrap">
      <form onSubmit={sendOtp}>
        <p style={{ color: color }}>{feedback}</p>
        <p>
          <b>Forget Password</b>
        </p>
        <FancyInput
          name={"Email"}
          type={"email"}
          value={email}
          onchange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
};
