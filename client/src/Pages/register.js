import { useState } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const [color, setColor] = useState("")
  const navigate = useNavigate()



  function handleSubmit(e){
    navigate('/login')
  }


  return (
    <div>
      <div className = 'login-container'>
        <div className="container">
        <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <>Name: </>
        <input onChange={(e) => setName(e.target.value)} value={name}></input>
        <br></br>
        <>Password: </>
        <input type="password" onChange={(e) => setPw(e.target.value)} value = {pw}></input>
        <br></br>
        <>Fav Color: </>
        <input onChange={(e) => setColor(e.target.value)} value = {color}></input>
        <br></br>
        <input type="submit" value="Register"></input>
      </form>
      <Link to="/login">Already have Account? Login</Link>
    </div>
        </div>
      </div>
  );
}

export default Register;
