import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../features/users/Login";
import Signup from "../features/users/Signup";

function App() {
    return (
        <div>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
        </div>
    )
}

export default App;
