import React, { useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { UserAccesss } from "./components/UserAccess";
import { Home } from "./components/Home";

import axios, { AxiosResponse } from "axios";
import { AppUrl } from "./components/AppConfig";

export const App = () => {
  const [feedback, setFeedback] = useState("");
  const [color, setColor] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [loginRegister, setLoginRegister] = useState("signin");
  const [home, setHome] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginRegister === "signin") {
      try {
        await axios
          .post(`${AppUrl}signin`, { phone, password })
          .then((Response) => {
            if (Response.status === 201) {
              setFeedback(Response.data.message);
              setColor("green");
              setTimeout(() => {
                localStorage.setItem("phone", Response.data.phone);
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
    } else if (loginRegister === "signup") {
      try {
        await axios
          .post(`${AppUrl}signup`, { phone, password })
          .then((response: AxiosResponse<{ message: string }>) => {
            if (response.status === 201) {
              setFeedback(response.data.message);
              setColor("green");
              setTimeout(() => {
                setLoginRegister("signin");
              }, 5000);
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              setFeedback(err.response.data.message);
              setColor("red");
            } else {
              console.error("Server error:", err);
            }
          });
      } catch (error) {
        console.log(error, "Server not responding");
      }
    } else if (loginRegister === "forgotpassword") {
      try {
        await axios
          .post(`${AppUrl}forgotpassword`, { phone })
          .then((response: AxiosResponse<{ message: string }>) => {
            if (response.status === 201) {
              setFeedback(response.data.message);
              setColor("green");
              setTimeout(() => {
                setLoginRegister("newpassword");
              }, 5000);
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              setFeedback(err.response.data.message);
              setColor("red");
            } else {
              console.error("Server error:", err);
            }
          });
      } catch (error) {
        console.log(error, "Server not responding");
      }
    } else if (loginRegister === "newpassword") {
      try {
        await axios
          .post(`${AppUrl}newpassword`, { phone, otp, password })
          .then((response: AxiosResponse<{ message: string }>) => {
            if (response.status === 200) {
              setFeedback(response.data.message);
              setColor("green");
              setTimeout(() => {
                setLoginRegister("signin");
              }, 5000);
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              setFeedback(err.response.data.message);
              setColor("red");
            } else {
              console.error("Server error:", err);
            }
          });
      } catch (error) {
        console.log(error, "Server not responding");
      }
    }
  };

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
      ) : (
        <UserAccesss
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
          onsubmit={submit}
          formname={
            loginRegister === "signin"
              ? "Sign In"
              : loginRegister === "signup"
              ? "Sign Up"
              : loginRegister === "forgotpassword"
              ? "Forgot Password"
              : loginRegister === "newpassword"
              ? "Change Passsword"
              : ""
          }
          otp={otp}
          setOtp={setOtp}
        />
      )}
    </div>
  );
};
