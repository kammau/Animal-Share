import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { viewSignup } from "./reducers/viewSlice";
import { logIn } from "./reducers/sessionSlice";

function Login() {
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
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                <h1 className="log_sign_header">Login</h1>
                <form id="login_form" autoComplete="off" onSubmit={formik.handleSubmit}>
                    <input
                        name="username"
                        className="username_input"
                        type="text"
                        placeholder="Your Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    <p>{formik.errors.username}</p>
                    <br />
                    <input 
                        name="password"
                        className="password_input"
                        type="password"
                        placeholder="Your Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <p>{formik.errors.password}</p>

                    <button type="submit" className="log_sign_btn">LOGIN</button>
                </form>
                <br />

                <section className="logsign_view_btns">
                    <button className="on_logsign_btn">LOGIN</button>
                    <button className="off_logsign_btn" onClick={() => dispatch(viewSignup())}>SIGNUP</button>
                </section>
            </div>
        </div>
    )

}

export default Login;