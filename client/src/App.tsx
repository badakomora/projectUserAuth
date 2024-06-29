import React, { useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
const App = () => {
  const [feedback, setFeedback] = useState("");
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginComp, setLoginComp] = useState(1);

  return (
    <div>
      <Nav loginComp={loginComp} setLoginComp={setLoginComp} />

      {loginComp === 1 ? (
        <Login
          color={color}
          setColor={setColor}
          feedback={feedback}
          setFeedback={setFeedback}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
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
      )}
    </div>
  );
};

export default App;
