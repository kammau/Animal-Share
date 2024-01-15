import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewLogin } from "./reducers/viewSlice";
import { viewSignup } from "./reducers/viewSlice";
import store from "../store"

import Login from "./Login";
import Signup from "./Signup";

function App() {
    let view = useSelector(() => store.getState().view.value)

    return (
        <div>
            {view === "login" ? (
                <Login />
            ) : (
                <Signup />
            )}
        </div>
    )
}

export default App;
