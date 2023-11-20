import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
//import Login from './login';

function Welcome(){

    const [cookies, setCookie] = useCookies(["user"]);
    const [color, setColor] = useState('');
    const [count, setCount] = useState('');
    const [name, setName] = useState('');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const searchId = cookies.user;
            
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                console.log(response.data);
                setColor(response.data.color)
                //setCount(response.data.count)
                setName(response.data.name)
            } catch (error) {
                console.log(error);
            }
          };
    
        handleFetchData();
      }, [color, count]);


    /*return(
        <>
        <h2>Welcome</h2>
        <p1>This is our messaging app! Visit your profile or your list of friends from the links above</p1>
        </>
    )*/

    return(
        <>
        <h2>Home</h2>
        {/*<p>Hello {user}!</p>*/}
        <p>Hello, {name}</p>
        <p>Your color is: {color}</p>
        
        </>
    )
}

export default Welcome