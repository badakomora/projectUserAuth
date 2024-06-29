/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react"
import axios from 'axios'
import { FancyInput } from './FancyInput'
import { AppUrl, notifications } from './AppConfig'



export const Login:React.FC<notifications> = ({email, setEmail, password, setPassword, color, setColor, feedback, setFeedback}) => {
   
    const login = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
            await axios.post(`${AppUrl}signin`, {email, password})
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
                <p><b>login</b></p>
                <FancyInput name={'Email'} type={'email'} value={email} onchange={(e) => { setEmail(e.target.value) } }/>
                <FancyInput name={'Password'} type={'password'} value={password} onchange={(e)=>{setPassword(e.target.value)}} />
                <button type="submit">Login</button>
                <a href=".">Forget Password</a>
            </form>
        </div>
    )
}