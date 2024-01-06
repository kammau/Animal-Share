import React from "react";
import { useState } from "react";

function LoginSignup() {
    const [view, setView] = useState("login")

    // function login() {

    // }

    // function signup() {

    // }

    return (
        <React.Fragment>
            <h1 id="welcome">WELCOME TO PETIFY</h1>
            {view === "login" ? (
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
                <div className="log_sign_body">
                    <div className="log_sign_div">
                        <h1 className="log_sign_header">Signup</h1>
                        <form id="signup_form" autoComplete="off">
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
                        <button className="log_sign_btn">SIGNUP</button>
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