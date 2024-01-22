import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";

function Messages() {
    const [messages, setMessages] = useState()

    useEffect(() => {
        fetch("/messages")
        .then((res) => res.json())
        .then((res) => setMessages([res]))
    })


    return (
        <div>
            {messages ? messages.map((message) => {
                return (
                    <MessageCard message={message} />
                )
            }) : <h1>No messages</h1>}
        </div>
    )
}

export default Messages;