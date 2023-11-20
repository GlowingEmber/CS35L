import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Welcome from '../welcome';
import Profile from '../profile/profile';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { CookiesProvider, useCookies } from "react-cookie";
import './home.css'

function Home(){

    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate()

    function logOut(){
        removeCookie("user", { path: '/'});
        navigate("/login")
    }

    useEffect(() => {
        if (!cookies.user) {
          navigate("/login");
        }
      }, [cookies]);


    return(
        <span className = "home-container">
            <span className = 'header'>
                <span className='link-container'>
                    <Link to="/home/welcome" className='header-link'>Home</Link>
                    <Link to="/home/profile" className='header-link'>Profile Page</Link>
                    <Link to="/home/friends" className='header-link'>Friends</Link>
                </span>
                <button onClick={logOut} className='logout-button'>Log Out</button>
            </span>
            <span className = "outlet">
                <>
                <Outlet></Outlet>
                </>
            </span>
        </span>
    ) 
}

export default Home