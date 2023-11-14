import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Welcome from '../welcome';
import Profile from '../profile/profile';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import './home.css'

function Home({user, setUser}){

    return(
        <>
            <span className = 'header'>
                <span className='link-container'>
                    <Link to="/home/welcome" className='header-link'>Home</Link>
                    <Link to="/home/profile" className='header-link'>Profile Page</Link>
                    <Link to="/home/friends" className='header-link'>Friends</Link>
                </span>
                <Link to="/login" className='logout-button'>Log Out</Link>
            </span>
            <Outlet></Outlet>
        </>
    ) 
}

export default Home