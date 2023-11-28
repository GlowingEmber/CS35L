import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Friends() {
  const [myFriends, setMyFriends] = useState(['isaacpinto1', 'pauleggert', 'red', 'gertge']);
  const [friendRequests, setFriendRequests] = useState(['newFriend1', 'newFriend2']);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [cookies] = useCookies(['user']);

  const acceptFriendRequest = (username) => {
    setMyFriends((prevFriends) => [...prevFriends, username]);
    setFriendRequests((prevRequests) => prevRequests.filter((request) => request !== username));
  };

  const denyFriendRequest = (username) => {
    setFriendRequests((prevRequests) => prevRequests.filter((request) => request !== username));
  };

  const addFriend = () => {
    console.log(`Adding friend: ${newFriendName}`);
    setNewFriendName(''); // Clear the input field after adding a friend
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '8px' }}>Add Friend:</p>
        <input
          type="text"
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <button onClick={addFriend}>Add</button>
      </div>
      <button onClick={() => setShowFriendRequests(true)}>View Friend Requests</button>
      {/* Friend Requests Modal */}
      {showFriendRequests && (
        <div className="friend-requests-modal">
          <h2>Friend Requests</h2>
          <ul>
            {friendRequests.map((request, index) => (
              <li key={index}>
                {request + ' '}
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