import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./reducers/sessionSlice";
import store from "../store"

import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";

function App() {
    const dispatch = useDispatch();

    let view = useSelector(() => store.getState().view.value)
    let user = useSelector(() => store.getState().session.status)

    useEffect(() => {
        fetch("/check_session")
        .then((res) => {
            if (res.ok) {
                res.json().then(() => dispatch(logIn()))
            }
        })
    }, [])

    return (
        <div>
            {user === true ? (
                <>
                    <NavBar />
                    <h1>Hello!</h1>
                </>
            ) : (
                <div>
                    {view === "login" ? (
                        <Login />
                    ) : (
                        <Signup />
                    )}
                </div>
            )}
        </div>
    )
}

export default App;