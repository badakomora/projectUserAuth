import React, { useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { ForgotPassword } from "./components/ForgotPassword";
import axios, { AxiosResponse } from "axios";
import { AppUrl } from "./components/AppConfig";
import africastalking from 'africastalking'

export const App = () => {
  const [feedback, setFeedback] = useState("");
  const [color, setColor] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loginRegister, setLoginRegister] = useState("signin");
  const [home, setHome] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };

  const register = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post(`${AppUrl}signup`, { phone, password })
        .then((response: AxiosResponse<{ message: string }>) => {
          if (response.status === 201) {
            setFeedback(response.data.message);
            setColor("green");
            setTimeout(() => {
              window.location.replace("/Signin");
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
  };

  const sendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const client = africastalking({
        username:"sandbox",
        apiKey:"atsk_28d65e015ae94581569d9639d242d1c8544d95ad8f7d3f2370c051dcfa83c603b00d3192"
      }
    )

    client.SMS.send({
        to:"+254759621394",
      message:"Hello",
      from:"Bada"
    })
    .then(()=>console.log("Message sent!"))
    .catch(err => console.log(err))
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
      ) : loginRegister === "signin" ? (
        <Login
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
          onsubmit={login}
          formname={"Login"}
        />
      ) : loginRegister === "signup" ? (
        <Register
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
          onsubmit={register}
          formname={"Register"}
        />
      ) : loginRegister === "forgotpassword" ? (
        <ForgotPassword
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
          onsubmit={sendOtp}
          formname={"Forgot Password"}
        />
      ) : (
        ""
      )}
    </div>
  );
};
