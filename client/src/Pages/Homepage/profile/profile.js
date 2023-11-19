import React from 'react'
import { useState } from 'react';
import './profile.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Profile({user, setUser}){

    const [bio, setBio] = useState('')
    const [newBio, setNewBio] = useState('')
    const [profilePicture, setProfilePicture] = useState('');
    const [newprofilePicture, setNewProfilePicture] = useState('');
    const [color, setColor] = useState('');
    const [name, setName] = useState('');
    const [newColor, setNewColor] = useState('')
    const navigate = useNavigate()
    const [userId, setUserId] = useState(null);

    const [newParameter, setNewParameter] = useState(''); // Add state for the new parameter

    useEffect(() => {
        const handleFetchData = async () => {
            try {
                const searchId = user;
            
                const response = await axios.get(`http://localhost:3001/getUserData?_id=${searchId}`);
                /*Query is passed as a dictionary. Names used determine the keys for the dictionary
                To have multiple: ?_id=${searchId}&param1=${queryParam1}&param2=${queryParam2} */
                console.log(response.data);
                setColor(response.data.color)
                setBio(response.data.bio)
                setProfilePicture(response.data.profilepicture)
                //setCount(response.data.count)
                setName(response.data.name)
            } catch (error) {
                console.log(error);
            }
          };
    
        handleFetchData();
      }, [color]);

      const changeParameter = async () => {
        try {
          // Your logic for changing the new parameter
          // Example: updating parameter using axios
          const response = await axios.put(`http://localhost:3001/updateParameter/${user}`, { parameter: newParameter });
          console.log(response.data); // Log the updated data
          // Update state or perform other actions based on the response
          setNewParameter(''); // Reset the input field
        } catch (error) {
          console.error('Error updating parameter:', error);
        }
      };

    const changeBio = async () => {
        
        try {
            const response = await axios.put(`http://localhost:3001/updateUserBio/${user}`, { bio: newBio });
            console.log(response.data); // The updated user data (including the new bio)
            setBio(response.data.bio);
            setNewBio('');
        } catch (error) {
            console.error('Error updating user bio:', error);
        }


        //setBio(newBio)// implement on backend 
        //setNewBio('')
    };

    const changeColor = async () => {
        try {
            //setColor(newColor)
            //setNewColor('')
            const response = await axios.put(`http://localhost:3001/updateUserColor/${user}`, { color: newColor });
            console.log(response.data); // The updated user data (including the new count)
            setNewColor('')
            setColor(response.data.color)
          } catch (error) {
            console.error('Error updating user count:', error);
          }
        };

        const changePicture = async () => {
            try {
                const response = await axios.put(`http://localhost:3001/updateProfilePicture/${user}`, { profilepicture: newprofilePicture });
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
        <h2>Profile</h2>
        {/*<p>Hello {user}!</p>*/}
        <div>
            <img id = "PFP" src={profilePicture} alt="Profile"/>
        </div>
        <p>pic source: {profilePicture}</p>
        <p>Username: {name}</p>
        <p>Your color is: {color}</p>
        <p>Bio: {bio}</p>
        <div>
            <p style={{display:"inline"}}>Change Bio: </p>
            <input value = {newBio} onChange={(e) => setNewBio(e.target.value)}></input>
            <button onClick={changeBio}>Submit Change</button>
        </div>
        
        <br/>
        
        {/*<p>Hello {user}!</p>*/}
        <div>
        <p style={{display:"inline"}}>Change Color: </p>
            <input value ={newColor} onChange={(e) => setNewColor(e.target.value)}></input>
            <button onClick={changeColor}>Submit Change</button>
        </div>
        <p style={{ display: 'inline' }}>Change PF Picture: </p>
        <input value={newprofilePicture} onChange={(e) => setNewProfilePicture(e.target.value)}></input>
        <button onClick={changePicture}>Submit Change</button>
        


        </>
        
        
    )
}

export default Profile