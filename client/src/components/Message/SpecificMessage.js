import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import store from "../../store";
import { useSelector } from "react-redux";


function SpecificMessage() {

    let recieverStore = useSelector(() => store.getState().sendTo.value)
    
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
        onSubmit: (values, {resetForm}) => {
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

            resetForm()
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} autoComplete="off" id="specific_message_back">
                <input type="text" name="messageTitle" onChange={formik.handleChange} value={formik.values.messageTitle} className="specific_msg_in" placeholder="Title"/>

                <textarea rows="5" cols="33" name="messageBody" onChange={formik.handleChange} value={formik.values.messageBody} className="specific_msg_in" placeholder="Body"></textarea>

                <button type="submit" className="animal_msg_btns">Send</button>
            </form>
        </>
    )
}

export default SpecificMessage;