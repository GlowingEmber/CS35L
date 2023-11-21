import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CookiesProvider, useCookies } from "react-cookie";

function Friends(){

    const myFriends = ["isaacpinto1", "pauleggert", "red"];
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);


    return(
        <>
            <h2>Friends:</h2>
            <ul>
                {myFriends.map((friend, index) => (
                <React.Fragment key={index}>
                    <Link to={`/home/friends/${encodeURIComponent(JSON.stringify(friend))}`}>
                    {friend}
                    </Link>
                    <br />
                </React.Fragment>
                ))}
            </ul>
            <br />
            <Outlet />
        </>
    )
}

export default Friends