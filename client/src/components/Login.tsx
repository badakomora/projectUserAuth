/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { useState} from "react"
import axios from 'axios'
export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("")
    const [color, setColor] = useState("");

    const login = async(e: {preventDefault: () => void})=>{
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/signin", {email, password})
            .then(Response => {
                if(Response.status === 201){
                    setFeedback(Response.data.message)
                    setColor("green");
                    localStorage.setItem('email', Response.data.email)
                    localStorage.setItem('id', Response.data.id)
                    setTimeout(() => {
                        window.location.replace('/');
                    }, 3000);
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
                //   console.error(err.response.data.message);
                  setFeedback(err.response.data.message)
                  setColor("red");
                } else {
                    setFeedback(err.response.data.message)
                    setColor("red");
                }
            })
        } catch (err) {
            console.log('Server error:', err);
        }
    }
    return(
        <div className="loginWrap">
            <form onSubmit={login}>
            <p style={{color: color}}>{feedback}</p>
            <div className="row">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" autoComplete="off" placeholder="email@example.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className="row">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}