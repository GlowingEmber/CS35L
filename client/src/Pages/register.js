import { useState, useEffect } from "react";
import React from "react";
import { ReactDOM } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

function Register() {

  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const [color, setColor] = useState("")
  const navigate = useNavigate()
  const [err, setErr] = useState(null); 
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) {
      removeCookie("user")
    }
    setErr(null)
  }, [cookies]);


  function handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:3001/register', {name, pw, color})
    .then(result => {console.log(result)
      if(result.data.status === "Success"){
        navigate("/login")
      } else{
        setErr("409") // 409: user already exists
      }
    })
    .catch(err => {console.log(err)
     if(err.message === "Network Error"){
      setErr("123")
     } 
    })
  
  }

  function showError(){
    if(err === null){
      return null
    } else if(err === "409"){
      return(<p>Username is taken</p>)
    } else if(err === "123"){
      return(<p>Error connecting to server</p>)
    }
  }


  return (
    <div>
      <div className = 'login-container'>
        <div className="container">
        <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <>Name: </>
        <input 
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)} 
          value={name}>
        </input>
        <br></br>
        <>Password: </>
        <input 
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)} 
          value = {pw}>
        </input>
        <br></br>
        {showError()}
        <input type="submit" value="Register" className="link-button"></input>
      </form>
      <Link to="/login" className="link-button">Already have Account? Login</Link>
    </div>
        </div>
      </div>
  );
}

export default Register;
