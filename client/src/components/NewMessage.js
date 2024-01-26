import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewMessage() {
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
        <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <input type="text" name="messageTitle" onChange={formik.handleChange} value={formik.values.messageTitle}/>

                <select name="reciever" onChange={formik.handleChange} values={formik.values.reciever}>
                    <option default selected hidden></option>
                    {users ? users.map((user) => <option key={user.id} value={user.username}>{user.username}</option>) : null}
                </select>

                <textarea rows="5" cols="33" name="messageBody" onChange={formik.handleChange} value={formik.values.messageBody}></textarea>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default NewMessage;