import React, { useState } from "react";
import SpecificMessage from "./SpecificMessage";
import { useDispatch } from "react-redux";
import { setSendTo } from "../reducers/sendToSlice";

function MessageCard({message, deleteMessage}) {
    const [replyView, setReplyView] = useState(false)
    
    const dispatch = useDispatch();

    function handleSendTo(to) {
        dispatch(setSendTo(to))
    }


    return (
        <div className="message_card">
            <h1>{message.messageTitle}</h1>
            <h3>From: {message.sender}</h3>
            <p>{message.messageBody}</p>

            <button onClick={() => deleteMessage(message)} className="message_btn_trash"><img src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon" className="trash_icon"/></button>
            <button onClick={() => setReplyView(true)} className="message_btn_reply"><img src="https://cdn.iconscout.com/icon/free/png-256/free-reply-1438244-1216205.png" alt="reply icon" className="trash_icon"/></button>

            <div>
                {replyView ? (
                    <div>
                        {handleSendTo(message.sender)}
                        <SpecificMessage />
                        <button onClick={() => setReplyView(false)} className="animal_msg_btns">Cancel</button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default MessageCard;