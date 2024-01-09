import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";


import Login from "./Login";
import Signup from "./Signup";
import { Router } from "react-router-dom/cjs/react-router-dom.min";

function App() {
    let view = useSelector(state => state.value)

    return (
        <div id="body">
            {view = "login" ? (
                <Login />
            ) : (
                <Signup />
            )}
        </div>
    )
}

export default App;
