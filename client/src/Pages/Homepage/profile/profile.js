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
    const [profilePicture, setProfilePicture] = useState('');
    const [newprofilePicture, setNewProfilePicture] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate()
    const [newPicture, setNewPicture] = useState('');

    const [newParameter, setNewParameter] = useState(''); // Add state for the new parameter
    
    const getUserId = (username) => {
        if (username === null) {
          return Promise.resolve(cookies.user || null);
        }
        return axios
          .get(`http://localhost:3001/getUserId?name=${displayedId}`)
          .then((response) => response.data.id)
          .catch((error) => {
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
                const searchId = await getUserId(decodedId);
                setDisplayedId(searchId)
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                //setCount(response.data.count)
                setBio(response.data.bio)
                setName(response.data.name)
                setProfilePicture(response.data.profilepicture)
            } catch (error) {
                console.log(error);
                setName(null)
            }
          };
        fetchData();
      }, [decodedId]);

      const changeParameter = async () => {
        try {
          // Your logic for changing the new parameter
          // Example: updating parameter using axios
          const response = await axios.put(`http://localhost:3001/updateParameter/${displayedId}`, { parameter: newParameter });
          console.log(response.data); // Log the updated data
          // Update state or perform other actions based on the response
          setNewParameter(''); // Reset the input field
        } catch (error) {
          console.error('Error updating parameter:', error);
        }
      };

    const changeBio = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/updateUserBio/${displayedId}`, { bio: newBio });
            console.log(response.data); // The updated user data (including the new bio)
            setBio(response.data.bio);
            setNewBio('');
        } catch (error) {
            console.error('Error updating user bio:', error);
        }
    };

    const changePicture = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/updateProfilePicture/${displayedId}`, { profilepicture: newprofilePicture });
            console.log(response.data); // The updated user data (including the new count)
            setNewProfilePicture('')
            setProfilePicture(response.data.picture)
          } catch (error) {
            console.error('Error updating user count:', error);
          } 


    };

    /*const changeProfilePicture = (newPicture) => {
        setProfilePicture(newPicture);
      };*/

    return(
        
        <>
        {name === '' ?
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
        :
            name === null ?
            <p>
                Error: User Not Found
            </p>
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
                    <p>pic source: {profilePicture}</p>
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
                <p style={{ display: 'inline' }}>Change PF Picture: </p>
                <input value={newprofilePicture} onChange={(e) => setNewProfilePicture(e.target.value)}></input>
                <button onClick={changePicture}>Submit Change</button>
            </>
            
        }
        </>
    )
}

export default Profile