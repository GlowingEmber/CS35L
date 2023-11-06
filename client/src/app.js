import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Pages/login';
import Home from './Pages/Home/home';
import Register from "./Pages/register";
import Profile from "./Pages/Home/profile";
import Welcome from "./Pages/Home/welcome";
import Friends from "./Pages/Home/friends";

function App(){


    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/register' element={<Register/>}></Route>
                <Route path = '/login' element={<Login/>}></Route>
                <Route path = '/home' element={<Home/>}>
                    <Route path = "welcome" element = {<Welcome/>}></Route>
                    <Route path = "profile" element = {<Profile/>}></Route>
                    <Route path = "friends" element = {<Friends/>}></Route>
                </Route>
                <Route path = "*" element={<Navigate to = "/login"/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App