export const AppUrl = "http://localhost:4000/";

export interface notifications {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  otp:string,
  setOtp:React.Dispatch<React.SetStateAction<string>>;
}

export interface appcomp {
  loginRegister: string;
  setLoginRegister: React.Dispatch<React.SetStateAction<string>>;
  home: boolean;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormProps{
  onsubmit:React.FormEventHandler<HTMLFormElement>,
  formname: string,
}