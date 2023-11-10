import React from "react";
import './message.css'

function Message({side, text, first, user}){
    return(
        <div className = {`msgContainer ${side}`}>
            {first ? <div className={`${side} name${side}`}>{user}</div> : null}
            <div className={`message message${side}`}>
                {text}
            </div>
        </div>
    )
}

export default Message