import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginSignup() {
    const [view, setView] = useState("login")
    const [error, setError] = useState(false)

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter a password"),
    })

    // Signup:
    const signupFormik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    // Login:
    const loginFormik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(`Login ${values}`)
        }
    })



    return (
        <React.Fragment>
            <h1 id="welcome">WELCOME TO PETIFY</h1>
            {view === "login" ? (
                // Login

                <div className="log_sign_body">
                    <div className="log_sign_div">
                        <h1 className="log_sign_header">Login</h1>
                        <form id="login_form" autoComplete="off">
                            <input
                                className="username_input"
                                type="text"
                                placeholder="Your Username"
                            />
                            <br />
                            <input 
                                className="password_input"
                                type="password"
                                placeholder="Your Password"
                            />
                        </form>
                        <button className="log_sign_btn">LOGIN</button>
                        <br />

                        <section className="logsign_view_btns">
                            <button className="on_logsign_btn">LOGIN</button>
                            <button 
                                className="off_logsign_btn"
                                onClick={() => setView("signup")}
                            >SIGNUP</button>
                        </section>
                    </div>
                </div>
            ) : (
                // Signup

                <div className="log_sign_body">
                    <div className="log_sign_div">
                        <h1 className="log_sign_header">Signup</h1>
                        <form id="signup_form" autoComplete="off" onSubmit={signupFormik.handleSubmit}>
                            <input
                                name="username"
                                className="username_input"
                                type="text"
                                placeholder="Your Username"
                                value={signupFormik.values.username}
                                onChange={signupFormik.handleChange}
                            />
                            <br />
                            <input 
                                name="password"
                                className="password_input"
                                type="password"
                                placeholder="Your Password"
                                value={signupFormik.values.password}
                                onChange={signupFormik.handleChange}
                            />
                            <button type="submit" className="log_sign_btn">SIGNUP</button>
                        </form>
                        <br />

                        <section className="logsign_view_btns">
                            <button 
                                className="off_logsign_btn"
                                onClick={() => setView("login")}
                            >LOGIN</button>
                            <button className="on_logsign_btn">SIGNUP</button>
                        </section>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default LoginSignup;