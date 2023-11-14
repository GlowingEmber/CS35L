import React from 'react'
import { useState } from 'react';
import './profile.css'
import axios from 'axios';

function Profile({user, setUser}){

    const [bio, setBio] = useState('')
    const [newBio, setNewBio] = useState('')
    const [name, setName] = useState('testName');
    const [profilePicture, setProfilePicture] = useState('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg');

    const changeBio = async () => {
        setBio(newBio)
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
        <br/>
        <br></br>
        <br></br>
        </>
    )
}

export default Profile