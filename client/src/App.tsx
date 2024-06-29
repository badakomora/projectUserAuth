import React, { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
export const App = () => {

  const [feedback, setFeedback] = useState("");
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginRegister, setLoginRegister] = useState("signin");
  const [home, setHome] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("email")){
      setHome(true)
    }
  }, [])

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
      ) : (loginRegister === "signin" ? (
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
      ))}
    </div>
  );
};
