import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Chats(){

    const myFriends = [["foo"], ["bar"], ["foo", "bar"]];

    return(
        <>
            <h2>Chats:</h2>
            <ul>
                {myFriends.map((friendList, index) => (
                <>
                    <Link to={`/home/chats/${encodeURIComponent(JSON.stringify(friendList))}`}>
                        {friendList.join(', ')}
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

export default Chats