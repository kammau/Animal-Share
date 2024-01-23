import React from "react";

function MessageCard({message, deleteMessage}) {
    return (
        <div className="message_card">
            <h1>{message.messageTitle}</h1>
            <h3>{message.sender}</h3>
            <p>{message.messageBody}</p>

            <button onClick={() => deleteMessage(message)}><img src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon"/></button>
        </div>
    )
}

export default MessageCard;