/* eslint-disable react/jsx-no-comment-textnodes */
import { FormProps, appcomp, notifications } from "./AppConfig";
import React from "react";
import { Form } from "./Form";


export const ForgotPassword: React.FC<FormProps & notifications & appcomp> = ({
  onsubmit,
  formname,
  email,
  setEmail,
  password,
  setPassword,
  color,
  setColor,
  feedback,
  setFeedback,
  setHome,
  loginRegister,
  setLoginRegister,
  home,
}) => {



  return (
    <Form 
    onsubmit={onsubmit}
    formname={formname}
    color={color}
    setColor={setColor}
    feedback={feedback}
    setFeedback={setFeedback}
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    loginRegister={loginRegister}
    setLoginRegister={setLoginRegister}
    home={home}
    setHome={setHome} />
  );
};
