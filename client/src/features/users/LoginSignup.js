import React from "react";
import { useState } from "react";

function LoginSignup() {
    const [view, setView] = useState("login")

    return (
        <React.Fragment>
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
                        <button className="log_sign_btn">Login</button>
                        <br />

                        <button id="goto_login">Login</button>
                        <button id="goto_signup">Signup</button>
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
                        <button className="log_sign_btn">Signup</button>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default LoginSignup;