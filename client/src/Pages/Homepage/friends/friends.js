import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';

function Friends() {
  const [myFriends, setMyFriends] = useState(['isaacpinto1', 'pauleggert', 'red', "gertge"]);
  const [friendRequests, setFriendRequests] = useState(['newFriend1', 'newFriend2']);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  const acceptFriendRequest = (username) => {
    // Logic to add the user to your friends list
    setMyFriends((prevFriends) => [...prevFriends, username]);
    // Remove the friend request
    setFriendRequests((prevRequests) => prevRequests.filter((request) => request !== username));
  };

  const denyFriendRequest = (username) => {
    // Logic to deny the friend request
    // Remove the friend request
    setFriendRequests((prevRequests) => prevRequests.filter((request) => request !== username));
  };

  return (
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
      <button onClick={() => setShowFriendRequests(true)}>View Friend Requests</button>
      {/* Friend Requests Modal */}
      {showFriendRequests && (
        <div className="friend-requests-modal">
          <h2>Friend Requests</h2>
          <ul>
            {friendRequests.map((request, index) => (
              <li key={index}>
                {request + " "}
                <button onClick={() => acceptFriendRequest(request)}>Accept</button>
                <button onClick={() => denyFriendRequest(request)}>Deny</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowFriendRequests(false)}>Close</button>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Friends;