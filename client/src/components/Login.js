import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Login() {
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
            console.log(`Login: ${values}`)
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
                    <br />
                    <input 
                        name="password"
                        className="password_input"
                        type="password"
                        placeholder="Your Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />

                    <button type="submit" className="log_sign_btn">LOGIN</button>
                </form>
                <br />

                {/* <section className="logsign_view_btns">
                    <button className="on_logsign_btn">LOGIN</button>
                    <button 
                        className="off_logsign_btn"
                        onClick={() => setView("signup")}
                    >SIGNUP</button>
                </section> */}
            </div>
        </div>
    )

}

export default Login;