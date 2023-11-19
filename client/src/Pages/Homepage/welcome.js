import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import Login from './login';

function Welcome({user, setUser}){

    const [color, setColor] = useState('');
    const [count, setCount] = useState('');
    const [name, setName] = useState('');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const searchId = user;
            
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
        <img src="https://cdn3.vectorstock.com/i/1000x1000/38/87/yeah-word-text-on-talk-shape-vector-45883887.jpg" alt="Image Description" width="75" height="100"></img>
        <img src="https://ih1.redbubble.net/image.524323222.7602/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg" alt="Image Description" width="75" height="100"></img>
        {/*<p>Hello {user}!</p>*/}
        <p>Hello, {name}</p>
        <p>Your color is: {color}</p>
        </>
    )
}

export default Welcome