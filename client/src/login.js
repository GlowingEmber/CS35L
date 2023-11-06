import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login({setUser}) {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const navigate = useNavigate()
  const [err, setErr] = useState(null)



  function handleSubmit(e){
    navigate("/home")
  }



  return (
    <div>
        <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <input type="password" onChange={(e) => setPw(e.target.value)} value = {pw}></input>
        <input type="submit" value="Submit"></input>
      </form>
      <Link to="/register">New User? Register</Link>
    </div>
  );
}

export default Login
