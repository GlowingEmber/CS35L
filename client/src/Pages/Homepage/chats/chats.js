import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './chats.css'

function Chats() {
  const [myChats, setMyChats] = useState([["isaacpinto1"], ["red"], ["pauleggert"]]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const friends = ["isaacpinto1", "eggert", "red"]

  const handleNewChat = () => {
    // Open the modal to select friends
    setShowModal(true);
  };

  const handleFriendSelection = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends((prevSelected) =>
        prevSelected.filter((selected) => selected !== friend)
      );
    } else {
      setSelectedFriends((prevSelected) => [...prevSelected, friend]);
    }
  };

  const isDuplicateChat = () => {
    // Check if the sorted order of selectedFriends is already in myChats
    const sortedSelectedFriends = [...selectedFriends].sort();
    return myChats.some((chat) => {
      const sortedChat = [...chat].sort();
      return JSON.stringify(sortedChat) === JSON.stringify(sortedSelectedFriends);
    });
  };

  const handleCreateChat = () => {
    // Check for duplicates
    if (isDuplicateChat()) {
        alert('Chat already exists!');
        setShowModal(false);
    } else{
        setMyChats((prevChats) => [...prevChats, selectedFriends]);
    }
    setShowModal(false);
    setSelectedFriends([]);
  };

  return (
    <>
      <h2>Chats:</h2>
      <ul>
        {myChats.map((friendList, index) => (
          <React.Fragment key={index}>
            <Link to={`/home/chats/${encodeURIComponent(JSON.stringify(friendList))}`}>
              {friendList.join(', ')}
            </Link>
            <br />
          </React.Fragment>
        ))}
      </ul>
      <button onClick={handleNewChat}>New Chat</button>
      {showModal && (
        <>
          <div className="overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal-container">
            <h3>Select Friend(s) for New Chat:</h3>
            <ul className='friend-list'>
              {friends.map((friend, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFriends.includes(friend)}
                      onChange={() => handleFriendSelection(friend)}
                    />
                    {" " + friend}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleCreateChat}>Create Chat</button>
          </div>
        </>
      )}
      <br />
      <Outlet />
    </>
  );
}

export default Chats;