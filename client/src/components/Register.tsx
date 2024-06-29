/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { FancyInput } from './FancyInput'
import { AppUrl, notifications } from './AppConfig'

export const Register:React.FC<notifications> = ({email, setEmail, password, setPassword, color, setColor, feedback, setFeedback}) =>{ 
   


    const Register = async(e: React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
           await axios.post(`${AppUrl}signup`, {email, password})
            .then((response: AxiosResponse<{message: string}>) => {
                if(response.status === 201){
                    setFeedback(response.data.message)
                    setColor("green");
                    setTimeout(() => {
                        window.location.replace('/Signin');
                    }, 5000);
                }
            })
            .catch(err => {
                if (err.response.status === 409) {
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

    
    return(
        <div className="loginWrap">
            <form onSubmit={Register}>
                <p style={{color: color}}>{feedback}</p>
                <p><b>Register</b></p>
                <FancyInput name={'Email'} type={'email'} value={email} onchange={(e)=>{setEmail(e.target.value)}} />
                <FancyInput name={'Password'} type={'password'} value={password} onchange={(e)=>{setPassword(e.target.value)}} />
                <button type="submit" >Register</button>
            </form>
        </div>
    )
}