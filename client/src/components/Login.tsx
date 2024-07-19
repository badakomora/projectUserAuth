/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import {appcomp, notifications, FormProps } from "./AppConfig";
import { Form } from "./Form";



export const Login: React.FC<notifications & appcomp & FormProps> = ({
  onsubmit,
  formname,
  phone,
  setPhone,
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
      phone={phone}
      setPhone={setPhone}
      password={password}
      setPassword={setPassword}
      loginRegister={loginRegister}
      setLoginRegister={setLoginRegister}
      home={home}
      setHome={setHome} 
      />
  );
};
