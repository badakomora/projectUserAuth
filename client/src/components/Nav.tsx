import React from "react";
import { LogoutUser } from "./logout";
import { appcomp } from "./AppConfig";
import { FancyLink } from "./FancyLink";

export const Nav: React.FC<appcomp> = ({ setLoginRegister }) => {

  return (
    <div>
      {localStorage.getItem("email") ? (
        <div className="nav">
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

          <ul className="nav-list">
            <FancyLink
              href={"email"}
              name={localStorage.getItem("email")}
              onclick={(e) => {
                e.preventDefault();
              }}
            />
            <FancyLink href={"logout"} onclick={LogoutUser} name={"Logout"} />
          </ul>
        </div>
      ) : (
        <div className="nav">
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
          <ul className="nav-list">
            <FancyLink
              href={"signin"}
              onclick={(e) => {
                e.preventDefault();
                setLoginRegister("signin");
              }}
              name={"SignIn"}
            />

            <FancyLink
              href={"signup"}
              onclick={(e) => {
                e.preventDefault();
                setLoginRegister("signup");
              }}
              name={"SignUp"}
            />
          </ul>
        </div>
      )}
    </div>
  );
};
