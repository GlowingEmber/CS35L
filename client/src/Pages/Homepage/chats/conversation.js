import React, { useState, useEffect, useRef, useLayoutEffect} from "react";
import { useParams } from "react-router-dom";
import './conversation.css'
import Message from "./message";


function Conversation(){

  const { friendList } = useParams();
  const decodedFriendList = JSON.parse(decodeURIComponent(friendList));
  const user = "userName1"
  const messagesColumnRef = useRef(null);

  const convodb = {
      "foo,userName1": [["userName1", "hey there foo!"], ["foo", "hey there usr!"], ["foo", "How are you?"], ["userName1", "I'm great!"]],
      "bar,userName1": [
        ["bar", "what's up usr"],
        ["userName1", "Not much bar"],
        ["userName1", "how are you"],
        ["bar", "I'm good, thanks!"],
        ["bar", "Did you watch the game last night?"],
        ["userName1", "Yeah, it was intense!"],
        ["userName1", "Who do you think will win the championship?"],
        ["bar", "Hard to say, but I'm rooting for my team!"],
        ["userName1", "They've been playing really well lately."],
        ["bar", "True, but your team has a strong lineup too."],
        ["bar", "By the way, have you tried that new restaurant downtown?"],
        ["userName1", "Not yet, but I heard it's fantastic!"],
        ["userName1", "Let's plan to go there next weekend."],
        ["bar", "Sounds like a plan!"],
        ["userName1", "Great! Looking forward to it."],
        ["bar", "Me too!"],
        // Add more messages as needed
      ],
      "bar,foo,userName1": [
        ["bar", "Hello, everyone!"],
        ["userName1", "Hey there!"],
        ["foo", "Hi, how's it going?"],
        ["userName1", "Not bad. What about you, bar?"],
        ["bar", "I'm doing well, thanks!"],
        ["foo", "Glad to hear that!"],
        ["foo", "Anyone up for a game night this weekend?"],
        ["bar", "Sounds like a plan! What games are we playing?"],
        ["userName1", "I'm in! How about some board games?"],
        ["foo", "Sure, board games it is!"],
        ["bar", "Looking forward to it!"],
        ["userName1", "Me too!"],
        ["foo", "Great! See you all on Saturday."],
      ]

  }
    

  const friendConversation = convodb[`${[user, ...decodedFriendList].sort().join(',')}`] || [];



  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [friendConversation]);



  return (
    <>
      <h1>Conversation with {decodedFriendList.join(', ')}:</h1>
      <div id="conversation">
        <div id = "conversationMessages" ref = {messagesColumnRef}>
          {friendConversation.map(([sender, text], index) => {
            const showName = ((index > 0) && (friendConversation[index-1][0] === sender))
            return (
                <Message text={text} side={sender === user ? 'right' : 'left'} first = {!showName} user = {sender}/>
            );
          })}
        </div>
        <input></input>
        <button>Send</button>
      </div>
    </>
  );
  };

export default Conversation