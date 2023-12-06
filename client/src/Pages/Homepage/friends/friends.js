import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Friends() {
  const [myFriends, setMyFriends] = useState([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [cookies, setCookie] = useCookies(["user"]);

  const [friendRequests, setFriendRequests] = useState([]);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  const [sentRequests, setSentRequests] = useState([]);
  const [showSentRequests, setShowSentRequests] = useState(false);


  async function acceptRequest(otherName) {
    const friender = cookies.user;
  
    try {
      const response = await axios.get(`http://localhost:3001/getUserId?name=${otherName}`);
      const recipient = response.data.id;
      try {
        await axios.put('http://localhost:3001/acceptFriendRequest', {
          friender,
          recipient
        });
        console.log("friend added!")
      } catch (error) {
        console.error('Error accepting friend:', error);
      }
    } catch (error) {
      console.error('Error getting recipient id:', error.response.data.message);
    }
    getSentRequests();
    getIncomingRequests();
    getFriends();
  }


  async function denyRequest(otherName) {
    const person1 = cookies.user;
  
    try {
      const response = await axios.get(`http://localhost:3001/getUserId?name=${otherName}`);
      const person2 = response.data.id;
  
      try {
        const response = await axios.delete('http://localhost:3001/deleteFriend', {
          data: { person1, person2 },
        });
        console.log(response.data); // Assuming the server responds with a success message
      } catch (error) {
        console.error('Error denying request:', error);
      }
    } catch (error) {
      console.error('Error getting recipient id:', error.response.data.message);
    }
    getSentRequests();
    getIncomingRequests();
  }



  async function addFriend(newFriendName) {
    const friender = cookies.user;
  
    try {
      const response = await axios.get(`http://localhost:3001/getUserId?name=${newFriendName}`);
  
      const recipient = response.data.id;

      if(recipient === friender){
        console.log("cant add yourself!")
        return;
      }
      if (myFriends.includes(newFriendName)) {
        console.log("Already friends!");
        return;
      }
  
      try {
        const addFriendResponse = await axios.post('http://localhost:3001/sendFriendRequest', {
          friender,
          recipient
        });

        console.log(addFriendResponse.data); // Assuming the server responds with a success message
      } catch (error) {
        console.error('Error adding friend:', error.response.data.message);
      }
    } catch (error) {
      console.error('Error getting recipient id:', error.response.data.message);
    }
    setNewFriendName('');
    getSentRequests();
  }

  const getSentRequests = async () => {
    const user = cookies.user;
    try {
      const getSentRequestsData = await axios.get(`http://localhost:3001/getOutgoingFriendRequests/${user}`);
      const friendRequests = getSentRequestsData.data.friendRequests;

      // Iterate over each dictionary and get user data
      const userDataPromises = friendRequests.map(async (request) => {
        const userDataResponse = await axios.get(`http://localhost:3001/getUserData`, {
          params: { _id: request.recipient },
        });
        return userDataResponse.data;
      });

      // Wait for all promises to resolve
      const userDataArray = await Promise.all(userDataPromises);

      const userNames = userDataArray.map((data) => data.name)

      // Update state with the collected user data
      setSentRequests(userNames);
      console.log(userNames)

    } catch (error) {
      console.error('Error getting sent requests:', error.response ? error.response.data.message : error.message);
    }
  };

  const getIncomingRequests = async () => {
    const user = cookies.user;
    try {
      const response = await axios.get(`http://localhost:3001/getIncomingFriendRequests/${user}`);
      const friendRequests = response.data.friendRequests;

      // Iterate over each dictionary and get user data
      const userDataPromises = friendRequests.map(async (request) => {
        const userDataResponse = await axios.get(`http://localhost:3001/getUserData`, {
          params: { _id: request.friender },
        });
        return userDataResponse.data;
      });

      // Wait for all promises to resolve
      const userDataArray = await Promise.all(userDataPromises);

      const userNames = userDataArray.map((data) => data.name)

      // Update state with the collected user data
      setFriendRequests(userNames);
      console.log(userNames);

    } catch (error) {
      console.error('Error getting incoming requests:', error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    if (showSentRequests) {
      getSentRequests();
    }
  }, [showSentRequests]);

  useEffect(() => {
    if (showFriendRequests) {
      getIncomingRequests();
    }
  }, [showFriendRequests]);

  const getFriends = async () => {
    const user = cookies.user;
    try {
      const response = await axios.get(`http://localhost:3001/getFriendsList/${user}`);
      console.log(response.data.friends)
      const friendRequests = response.data.friends;

      // Iterate over each dictionary and get user data
      const userDataPromises = friendRequests.map(async (request) => {
        const friendId = request.friender === cookies.user ? request.recipient : request.friender;
        const userDataResponse = await axios.get(`http://localhost:3001/getUserData`, {
          params: { _id: friendId },
        });
        return userDataResponse.data;
      });

      // Wait for all promises to resolve
      const userDataArray = await Promise.all(userDataPromises);

      const userNames = userDataArray.map((data) => data.name)

      // Update state with the collected user data
      setMyFriends(userNames);
      console.log(userNames);
    } catch (error) {
      console.error('Error getting incoming requests:', error.response ? error.response.data.message : error.message);
    }
  }

  useEffect(()=>{
    getFriends();
  }, [])




  return (
    <>
      <h2>Friends:</h2>
      <ul>
        {myFriends.map((friend, index) => (
          <React.Fragment key={index}>
            <button onClick={()=>denyRequest(friend)}>X</button>
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
        <button onClick={() => addFriend(newFriendName)}>Add</button>
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
                <button onClick={() => acceptRequest(request)}>Accept</button>
                <button onClick={() => denyRequest(request)}>Deny</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowFriendRequests(false)}>Close</button>
        </div>
      )}
      <br/>
      <br/>
      <button onClick={() => setShowSentRequests(true)}>View Pending Requests</button>
      {showSentRequests && (
        <div className="friend-requests-modal">
          <h2>Sent Requests</h2>
          <ul>
            {sentRequests.map((request, index) => (
              <li key={index}>
                {request + ' '}
                <button onClick={() => denyRequest(request)}>Cancel</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowSentRequests(false)}>Close</button>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default Friends;