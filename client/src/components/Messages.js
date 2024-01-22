import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import NewMessage from "./NewMessage";

function Messages() {
    const [messages, setMessages] = useState()

    useEffect(() => {
        fetch("/messages")
        .then((res) => res.json())
        .then((res) => setMessages([res]))
    }, [])




    return (
        <div>
            <NewMessage />

            <div id="messages_body">
                {messages ? messages.map((message) => {
                    return (
                        <MessageCard message={message} />
                    )
                }) : <h1>No messages</h1>}
            </div>
        </div>
    )
}

export default Messages;