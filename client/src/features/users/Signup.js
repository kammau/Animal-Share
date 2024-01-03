function Signup() {
    return (
        <div className="log_sign_form">
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
    )
}

export default Signup;