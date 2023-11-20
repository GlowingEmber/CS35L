import React from 'react'
import { useState } from 'react';
import './profile.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { CookiesProvider, useCookies } from "react-cookie";

function Profile(){

    const [cookies, setCookie] = useCookies(["user"]);

    const [bio, setBio] = useState('')
    const [newBio, setNewBio] = useState('')
    const [profilePicture, setProfilePicture] = useState('https://www.cs.ucla.edu/wp-content/uploads/cs/eggert-2.jpg');
    const [color, setColor] = useState('');
    const [name, setName] = useState('');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()

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
      }, [color]);

    

    const changeBio = async () => {
        setBio(newBio)// implement on backend 
        setNewBio('')
    };

    return(
        <>
        <h2>Profile</h2>
        {/*<p>Hello {user}!</p>*/}
        <div>
            <img id = "PFP" src={profilePicture} alt="Profile"/>
        </div>
        <p>Username: {name}</p>
        <p>Bio: {bio}</p>
        <div>
            <p style={{display:"inline"}}>Change Bio: </p>
            <input value = {newBio} onChange={(e) => setNewBio(e.target.value)}></input>
            <button onClick={changeBio}>Submit Change</button>
        </div>
        </>
    )
}

export default Profile