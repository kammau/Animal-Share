import React, { useState } from "react";
import NewMessage from "./NewMessage";

function MessageCard({message, deleteMessage}) {
    const [replyView, setReplyView] = useState(false)


    return (
        <div className="message_card">
            <h1>{message.messageTitle}</h1>
            <h3>{message.sender}</h3>
            <p>{message.messageBody}</p>

            <button onClick={() => deleteMessage(message)}><img src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon"/></button>
            <button onClick={() => setReplyView(true)}><img src="https://cdn.iconscout.com/icon/free/png-256/free-reply-1438244-1216205.png" alt="reply icon"/></button>

            <div>
                {replyView ? (
                    <form>
                        <button onClick={() => setReplyView(false)}>Cancel</button>
                        <NewMessage />
                    </form>
                ) : null}
            </div>
        </div>
    )
}

export default MessageCard;