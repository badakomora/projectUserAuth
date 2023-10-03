import {useRecoilState} from "recoil"
import {sessionemail} from "../recoil/atom";

export function ClearUserData(){
    localStorage.removeItem('email');
    const [, logoutEmail] = useRecoilState(sessionemail);
    logoutEmail("");
}