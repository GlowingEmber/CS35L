import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CookiesProvider, useCookies } from "react-cookie";

function Friends(){

    const myFriends = ["isaacpinto1", "eggert", "red"];
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);


    return(
        <>
            <h2>Friends:</h2>
            <ul>
                {myFriends.map((friend, index) => (
                <>
                    <Link to={`/home/friends/${encodeURIComponent(JSON.stringify(friend))}`}>
                        {friend}
                    </Link>
                    <br/>
                </>
            ))}
            </ul>
            <br/>
            <Outlet></Outlet>
        </>
    )
}

export default Friends