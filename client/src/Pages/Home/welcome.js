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
        </>
    )
}

export default Welcome