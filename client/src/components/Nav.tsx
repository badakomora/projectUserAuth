import React from "react";
import { LogoutUser } from "./logout";
import { appcomp, email } from "./AppConfig";

export const Nav: React.FC<appcomp> = ({ setLoginComp }) => {
  const tabs = (index: number) => {
    setLoginComp(index);
  };

  if (!email) {
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <img
              src="https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-home-page-palm-beach-classics-8.png"
              height={45}
              width={45}
              alt=""
            />
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <ul className="nav-list">
          <li>
            <a href="signin" className="m-2" onClick={() => tabs(1)}>
              signin
            </a>
          </li>
          <li>
            <a href="signup" className="m-2" onClick={() => tabs(2)}>
              signup
            </a>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <img
              src="https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-home-page-palm-beach-classics-8.png"
              height={45}
              width={45}
              alt=""
            />
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <ul className="nav-list">
          <li>
            <a href="." className="m-2">
              {email}
            </a>
          </li>
          <li>
            <a href="." className="m-2" onClick={LogoutUser}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
};
