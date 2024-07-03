import React, { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import {ForgotPassword} from "./components/ForgotPassword"



export const App = () => {
  const [feedback, setFeedback] = useState("");
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginRegister, setLoginRegister] = useState("signin");
  const [home, setHome] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

  useEffect(() => {
    if (forgetPassword) {
      setForgetPassword(true);
    }
  }, [forgetPassword]);

  return (
    <div>
      <Nav
        loginRegister={loginRegister}
        setLoginRegister={setLoginRegister}
        home={home}
        setHome={setHome}
      />

{home ? (
  <Home />
 ) : (forgetPassword ? (
  <ForgotPassword color={color}
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
  setHome={setHome}
  forgetPassword={forgetPassword}
  setForgetPassword={setForgetPassword} />
 ) :( loginRegister === "signin" ? (
  <Login
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
    setHome={setHome}
    forgetPassword={forgetPassword}
    setForgetPassword={setForgetPassword}
  />
  ) : (
  <Register
    color={color}
    setColor={setColor}
    feedback={feedback}
    setFeedback={setFeedback}
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
  />
  )))}
    </div>
  );
};
