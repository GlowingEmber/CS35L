import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Friends(){

    const myFriends = [["foo"], ["bar"], ["foo", "bar"]];

    return(
        <>
            <h2>Friends:</h2>
            <ul>
                {myFriends.map((friendList, index) => (
                <>
                    <Link to={`/home/friends/${encodeURIComponent(JSON.stringify(friendList))}`}>
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

export default Friends