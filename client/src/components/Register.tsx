/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import { useState } from "react"
import axios, { AxiosResponse } from 'axios'
export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [feedback, setFeedback] = useState("");
    const [color, setColor] = useState("");


    const Register = async(e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
           await axios.post("http://localhost:4000/signup", {email, password})
            .then((response: AxiosResponse<{message: string}>) => {
                if(response.status === 201){
                    // console.log(response.data);
                    setFeedback(response.data.message)
                    setColor("green");
                    setTimeout(() => {
                        window.location.replace('/Signin');
                    }, 5000);
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
                //   console.error(err.response.data.message);
                  setFeedback(err.response.data.message)
                  setColor("red");
                } else {
                  console.error('Server error:', err);
                }
            })
        }catch(error){
            console.log(error,"Server not responding")
        }  
    }


    const clickRegister = () => {
       console.log(feedback)
    }
    return(
        <div className="loginWrap">
            <form onSubmit={Register}>
            <p style={{color: color}}>{feedback}</p>
            <div className="row">
                <label htmlFor="email">Email </label>
                <input type="email" name="email" autoComplete="off" placeholder="email@example.com"   value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="row">
                <label htmlFor="password">Password </label>
                <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
            </div>
            <button type="submit" onClick={clickRegister}>Register</button>
            <a href=".">Forget Password</a>
            </form>
        </div>
    )
}