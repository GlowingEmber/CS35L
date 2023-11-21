import React from 'react'
import { useState } from 'react';
import './profile.css'
import axios from 'axios';
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import { CookiesProvider, useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

function Profile(){


    const [cookies, setCookie] = useCookies(["user"]);
    const [displayedId, setDisplayedId] = useState("")
    const [bio, setBio] = useState('This bio is filler')
    const [newBio, setNewBio] = useState('')
    const [profilePicture, setProfilePicture] = useState('https://www.cs.ucla.edu/wp-content/uploads/cs/eggert-2.jpg');
    const [name, setName] = useState('');
    const navigate = useNavigate()


    
    const getUserId = (username) => {
        if (username === null) {
            return Promise.resolve(null);
        }
        return axios.get(`http://localhost:3001/getUserId?name=${username}`)
            .then(response => response.data.id)
            .catch(error => {
                console.log(error);
                return null;
            });
    };

    const { friend } = useParams();
    const decodedId = friend ? JSON.parse(decodeURIComponent(friend)) : null;
    // Use .then() to handle the resolved value of the promise

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await getUserId(decodedId);
                const searchId = userId ? userId : cookies.user
                console.log(searchId)
                setDisplayedId(searchId)
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                //setCount(response.data.count)
                setName(response.data.name)
            } catch (error) {
                console.log(error);
            }
          };
        fetchData();
      }, [decodedId]);

    

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
            {displayedId === cookies.user ?
            <h2>Your Profile:</h2>:
            <h2>{name}'s Profile:</h2>
            }
            <div>
                <img id = "PFP" src={profilePicture} alt="Profile"/>
            </div>
            {displayedId === cookies.user ?
            <>
                <p>Username: {name}</p>
                <p>Bio: {bio}</p>
                <div>
                    <p style={{display:"inline"}}>Change Bio: </p>
                    <input value = {newBio} onChange={(e) => setNewBio(e.target.value)}></input>
                    <button onClick={changeBio}>Submit Change</button>
                </div>
            </>
            :
            <>
            <p>Bio: {bio}</p></>
            }
        </>
        }
        </>
    )
}

export default Profile