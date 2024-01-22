import React from "react";

function MessageCard({message}) {
    return (
        <div className="message_card">
            <h1>{message.messageTitle}</h1>
            <h3>{message.sender}</h3>
            <p>{message.messageBody}</p>
        </div>
    )
}

export default MessageCard;