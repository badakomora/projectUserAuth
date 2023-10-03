import { atom } from 'recoil';

export const sessionemail = atom({
  key: 'loggedInEmail',
  default: localStorage.getItem('email'),
})


