import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Home({user, setUser}){

    const [color, setColor] = useState('testName');
    const [count, setCount] = useState(0);
    const [name, setName] = useState('testName');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()

    const changeCount = async (val) => {
        setCount(count + val)
        };

    const changeColor = async () => {
        setColor(newColor)
        setNewColor('')
        };

    return(
        <>
        <h2>Home</h2>
        {/*<p>Hello {user}!</p>*/}
        <p>Your name is: {name}</p>
        <p>Your color is: {color}</p>
        <p>Your count is: {count}</p>
        <div>
            <p style={{display:"inline"}}>Change Color: </p>
            <input value ={newColor} onChange={(e) => setNewColor(e.target.value)}></input>
            <button onClick={changeColor}>Submit Change</button>
        </div>
        <div>
            <p style={{display:"inline"}}>Increase Count: </p>
            <button onClick={() =>changeCount(1)}>+1</button>
        </div>
        <div>
            <p style={{display:"inline"}}>Decrease Count: </p>
            <button onClick={() =>changeCount(-1)}>-1</button>
        </div>
        <Link to="/login">Log Out</Link>
        <br></br>
        <br></br>
        </>
    )
}

export default Home