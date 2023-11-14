import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './login.css'

function Login({setUser}) {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const navigate = useNavigate()
  const [err, setErr] = useState(null)



  function handleSubmit(e){
    navigate("/home/welcome")
  }



  return (
    <div className="login-container">
      <div className="container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPw(e.target.value)}
        value={pw}
      />
      <input type="submit" value="Submit" className="button" />
    </form>
    <Link to="/register" className="link-button test">
      New User? Register
    </Link>
  </div>
    </div>
  );
}

export default Login
