export const AppUrl = 'http://localhost:4000/'

export const email = localStorage.getItem("email")

export interface notifications{
    color:string,
    setColor:React.Dispatch<React.SetStateAction<string>>,
    feedback:string,
    setFeedback:React.Dispatch<React.SetStateAction<string>>,
    email:string,
    setEmail:React.Dispatch<React.SetStateAction<string>>,
    password:string,
    setPassword:React.Dispatch<React.SetStateAction<string>>,
}