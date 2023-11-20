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
    const [name, setName] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const searchId = cookies.user;
            
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                //setCount(response.data.count)
                setName(response.data.name)
            } catch (error) {
                console.log(error);
            }
          };
    
        handleFetchData();
      }, []);

    

    const changeBio = async () => {
        setBio(newBio)// implement on backend 
        setNewBio('')
    };

    return(
        <>
        {name === '' ?
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
        :
        <>
            <h2>{name}'s Profile:</h2>
            <div>
                <img id = "PFP" src={profilePicture} alt="Profile"/>
            </div>
            <p>Bio: {bio}</p>
            <div>
                <p style={{display:"inline"}}>Change Bio: </p>
                <input value = {newBio} onChange={(e) => setNewBio(e.target.value)}></input>
                <button onClick={changeBio}>Submit Change</button>
            </div>
        </>
        }
        </>
    )
}

export default Profile