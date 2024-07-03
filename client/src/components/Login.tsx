/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";
import axios from "axios";
import { FancyInput } from "./FancyInput";
import { AppUrl, appcomp, notifications } from "./AppConfig";
import { FancyLink } from "./FancyLink";

interface forgetpasswordprops {
  forgetPassword: boolean;
  setForgetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login: React.FC<forgetpasswordprops & notifications & appcomp> = ({
  email,
  setEmail,
  password,
  setPassword,
  color,
  setColor,
  feedback,
  setFeedback,
  setHome,
  setForgetPassword,
}) => {
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`${AppUrl}signin`, { email, password })
        .then((Response) => {
          if (Response.status === 201) {
            setFeedback(Response.data.message);
            setColor("green");
            setTimeout(() => {
              localStorage.setItem("email", Response.data.email);
              localStorage.setItem("id", Response.data.id);
              setHome(true);
            }, 3000);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setFeedback(err.response.data.message);
            setColor("red");
          } else {
            setFeedback(err.response.data.message);
            setColor("red");
          }
        });
    } catch (err) {
      console.log("Server error:", err);
    }
  };

  return (
    <div className="loginWrap">
      <form onSubmit={login}>
        <p style={{ color: color }}>{feedback}</p>
        <p>
          <b>Login</b>
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
        <FancyInput
          name={"Password"}
          type={"password"}
          value={password}
          onchange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
        <FancyLink
          href={"Forgotpassword"}
          name={"Forget Password"}
          onclick={(e) => {
            e.preventDefault();
            setForgetPassword(true);
          }}
        />
      </form>
    </div>
  );
};
