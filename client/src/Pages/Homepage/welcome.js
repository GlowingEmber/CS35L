import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Welcome({user, setUser}){

    return(
        <>
        <h2>Welcome</h2>
        <p1>This is our messaging app! Visit your profile or your list of friends from the links above</p1>
        </>
    )
}

export default Welcome