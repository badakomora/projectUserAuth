import React from "react";
import { Link } from "react-router-dom";
import { ClearUserData } from "./logout";

export const Nav = () => {
  const email = localStorage.getItem("email");

  if (!email) {
    return (
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link className="m-2" to="/">
              <img src="https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-home-page-palm-beach-classics-8.png" height={45} width={45} alt="" />
            </Link>
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
          <li><Link className="m-2" to="/Signup">Sign up</Link></li>
          <li><Link className="m-2" to="/Signin">Sign in</Link></li>
        </ul>
      </div>
    );
  } else {
    return (
    <div className="nav">
    <input type="checkbox" id="nav-check" />
    <div className="nav-header">
      <div className="nav-title">
        <Link className="m-2" to="/">
          <img src="https://www.freepnglogos.com/uploads/mercedes-logo-png/mercedes-logo-home-page-palm-beach-classics-8.png" height={45} width={45} alt="" />
        </Link>
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
      <li><Link className="m-2" to="/">{email}</Link></li>
      <li><Link className="m-2" onClick={ClearUserData} to={""}>Logout</Link></li>
    </ul>
  </div>
    );
  }
}
