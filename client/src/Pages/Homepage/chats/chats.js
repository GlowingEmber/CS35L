import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Chats() {
  const [myChats, setMyChats] = useState([["foo"], ["bar"], ["bar", "foo"]]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const friends = ["isaacpinto1", "eggert", "red"]

  const handleNewChat = () => {
    // Open the modal to select friends
    setShowModal(true);
  };

  const handleFriendSelection = (friend) => {
    // Add or remove friend from the selectedFriends array
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friend)) {
        return prevSelected.filter((selected) => selected !== friend);
      } else {
        return [...prevSelected, friend];
      }
    });
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
        <div className="modal">
          <h3>Select Friends for New Chat:</h3>
          <ul>
            {friends.map((friend, index) => (
              <li key={index} onClick={() => handleFriendSelection(friend)}>
                {friend} {selectedFriends.includes(friend) ? '(Selected)' : ''}
              </li>
            ))}
          </ul>
          <button onClick={handleCreateChat}>Create Chat</button>
        </div>
      )}
      <br />
      <Outlet />
    </>
  );
}

export default Chats;