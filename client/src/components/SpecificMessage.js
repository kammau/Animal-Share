import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import store from "../store";
import { useSelector } from "react-redux";


function SpecificMessage() {

    let recieverStore = useSelector(() => store.getState().sendTo.value)
    console.log(recieverStore)
    
    const formSchema = yup.object().shape({
        messageTitle: yup.string().required("Please enter a title"),
        messageBody: yup.string().required("Please enter a message body")
    })

    const formik = useFormik({
        initialValues: {
            messageTitle: "",
            messageBody: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messageTitle: values.messageTitle,
                    messageBody: values.messageBody,
                    reciever: recieverStore
                })
            })
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <input type="text" name="messageTitle" onChange={formik.handleChange} value={formik.values.messageTitle}/>

                <textarea rows="5" cols="33" name="messageBody" onChange={formik.handleChange} value={formik.values.messageBody}></textarea>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default SpecificMessage;