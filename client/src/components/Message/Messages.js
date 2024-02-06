import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import NewMessage from "./NewMessage";

function Messages() {
    const [messages, setMessages] = useState()
    const [showNew, setShowNew] = useState(false)

    useEffect(() => {
        fetch("/messages")
        .then((res) => {
            if (res.status === 200) {
                return res.json().then((res) => {
                    setMessages(res)
                })
            }
            else return
        })
    }, [])

    function deleteMessage(message) {
        fetch(`/messages/${message.id}`, {
            method: "DELETE",
        })
        .then(() => {
            if (messages.length > 0) {
                let updatedMessages = messages.filter((m) => m.id !== message.id)
                setMessages(updatedMessages)
            } else {
                setMessages()
            }
        })
    }


    return (
        <div>
            {showNew ? (
                    <NewMessage setShowNew={setShowNew}/>
            ) : <button className="add_btn" onClick={() => setShowNew(true)}>+</button>}

            <div id="messages_body">
                {messages ? messages.map((message) => {
                    return (
                        <MessageCard key={message.id} message={message} deleteMessage={deleteMessage}/>
                    )
                }) : <h1 className="page_headers">No messages</h1>}
            </div>
        </div>
    )
}

export default Messages;