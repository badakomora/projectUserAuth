import React, { useState } from 'react';
import './App.css'
import {Nav} from "./components/Nav";
import {Home} from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from './components/Register';
import { Login } from './components/Login'
const App = () => {
  const [feedback, setFeedback] = useState("")
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
    <Route path="/" index element={<Home />} />
          <Route path="/Signup" element={<Register  color={color} setColor={setColor} feedback={feedback} setFeedback={setFeedback} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>} />
          <Route path="/Signin" element={<Login color={color} setColor={setColor} feedback={feedback} setFeedback={setFeedback} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/> } />
    <Route/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;