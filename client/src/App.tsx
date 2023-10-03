import React from 'react';
import './App.css'
import {Nav} from "./components/Nav";
import {Home} from "./components/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from './components/Register';
import { Login } from './components/Login'
const App = () => {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
    <Route path="/" index element={<Home />} />
          <Route path="/Signup" element={<Register />} />
          <Route path="/Signin" element={<Login />} />
    <Route/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;