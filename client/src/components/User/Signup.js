import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { viewLogin } from "../reducers/viewSlice";
import { logIn } from "../reducers/sessionSlice";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {

    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter a password"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {

            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((res) => {
                if (res.ok) {
                    dispatch(logIn())
                }
            })
        }
    })

    return (
        <div className="log_sign_body">
            <div className="log_sign_div">
                <h1 className="log_sign_header">Signup</h1>
                <form id="signup_form" autoComplete="off" onSubmit={formik.handleSubmit}>
                    <input
                        name="username"
                        className="username_input"
                        placeholder="Username"
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    <p className="logsig_errors">{formik.errors.username}</p>
                    <br />
                    <input 
                        name="password"
                        className="password_input"
                        type="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <p className="logsig_errors">{formik.errors.password}</p>
                    <button type="submit" className="log_sign_btn">SIGNUP</button>
                </form>
                <br />

                <section className="logsign_view_btns">
                    <NavLink to="/login" exact><button className="off_logsign_btn" onClick={() => dispatch(viewLogin())}>LOGIN</button></NavLink>
                    <button className="on_logsign_btn">SIGNUP</button>
                </section>
            </div>
        </div>
    )
}

export default Signup;