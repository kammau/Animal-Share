import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


import LoginSignup from "../features/users/LoginSignup";

function App() {
    return (
        <div id="body">
            <Route exact path="/login_signup">
                <LoginSignup />
            </Route>
        </div>
    )
}

export default App;
