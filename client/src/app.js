import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './login';
import Home from './home';
import Register from "./register";

function App(){


    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/register' element={<Register/>}></Route>
                <Route path = '/login' element={<Login/>}></Route>
                <Route path = '/home' element={<Home/>}></Route>
                <Route path = "*" element={<Navigate to = "/login"/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App