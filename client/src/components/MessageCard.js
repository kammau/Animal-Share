import React from "react";

function MessageCard({message}) {
    return (
        <h1>{message.messageBody}</h1>
    )
}

export default MessageCard;