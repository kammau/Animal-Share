import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import NewMessage from "./NewMessage";

function Messages() {
    const [messages, setMessages] = useState()

    useEffect(() => {
        fetch("/messages")
        .then((res) => {
            if (res.status === 200) {
                return res.json().then((res) => setMessages([res]))
            }
            else return
        })
    }, [])

    function deleteMessage(message) {
        fetch(`/messages/${message.id}`, {
            method: "DELETE",
        })
        .then((res) => res.json)
        .then((res) => console.log(res))
    }


    return (
        <div>
            <NewMessage />

            <div id="messages_body">
                {messages ? messages.map((message) => {
                    return (
                        <MessageCard message={message} deleteMessage={deleteMessage}/>
                    )
                }) : <h1>No messages</h1>}
            </div>
        </div>
    )
}

export default Messages;