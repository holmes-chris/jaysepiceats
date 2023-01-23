import React from 'react';
import "./Login.css";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container" style={{height: "calc(100vh - 140px)"}}>
      <div className="login-content">
        <h1 className="login-header">Login</h1>
        <div className="login-entry-fields">
          <div className="username-entry-container">
            <h3>Username</h3>
            <input type="text"/>
          </div>
          <div className="password-entry-container">
            <h3>Password</h3>
            <input type="password" />
          </div>
        </div>
        <button className="login-submit-bttn">
          <Link style={{textDecoration: "none", color: "white"}} to="/admin">LOGIN</Link>
        </button>
          
      </div>

      <Outlet />
    </div>
  )
}

export default Login