import React from 'react'

function Friends(){

    const myFriends = ["foo", "bar", "egg", "tom"]

    return(
        <>
            <h2>Friends:</h2>
            <ul>
                {myFriends.map((item) => (<li>{item}</li>))}
            </ul>
        </>
    )
}

export default Friends