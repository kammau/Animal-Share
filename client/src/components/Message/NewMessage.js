import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewMessage({setShowNew}) {
    const [users, setUsers] = useState();


    useEffect(() => {
        fetch("/users")
        .then((res) => res.json())
        .then((res) => setUsers(res))
    }, [])

    const formSchema = yup.object().shape({
        messageTitle: yup.string().required("Please enter a title"),
        messageBody: yup.string().required("Please enter a message body"),
        reciever: yup.string().required("Please select someone to send the message to")
    })

    const formik = useFormik({
        initialValues: {
            messageTitle: "",
            messageBody: "",
            reciever: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch("/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            
            resetForm()
        }
    })

    return (
        <>
            <button className="new_msg_btn" onClick={() => setShowNew(false)}>-</button>
            <div id="new_message_container">
                <form onSubmit={formik.handleSubmit} autoComplete="off" id="new_message_form">
                    <input type="text" name="messageTitle" onChange={formik.handleChange} value={formik.values.messageTitle} placeholder="Title" id="new_msg_title"/>

                    <div id="new_msg_to_div">
                        <label htmlFor="reciever">Send To</label>
                        <select name="reciever" onChange={formik.handleChange} values={formik.values.reciever} id="new_msg_to">
                            <option hidden disabled>Select To</option>
                            {users ? users.map((user) => <option key={user.id} value={user.username}>{user.username}</option>) : null}
                        </select>
                    </div>

                    <textarea rows="5" cols="33" name="messageBody" onChange={formik.handleChange} value={formik.values.messageBody} placeholder="Message Body" id="new_msg_body"></textarea>

                    <button type="submit" id="send_msg_btn">Send</button>
                </form>
            </div>
        </>
    )
}

export default NewMessage;