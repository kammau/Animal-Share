import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


import Login from "./Login";
import Signup from "./Signup";

function App() {
    return (
        <div id="body">
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
            </Switch>
        </div>
    )
}

export default App;
