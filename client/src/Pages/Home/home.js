import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Welcome from './welcome';
import Profile from './profile';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';

function Home({user, setUser}){

    return(
        <>
            <h1>Homepage</h1>
            <Link to="/login">Log Out</Link>
            <br/>
            <Link to="/home/welcome">Welcome Page</Link>
            <br/>
            <Link to="/home/profile">Profile Page</Link>
            <br/>
            <Link to="/home/friends">Friends</Link>
            <br/>
            <Outlet></Outlet>
        </>
    ) 
}

export default Home