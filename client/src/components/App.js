import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./reducers/sessionSlice";
import store from "../store"

import Login from "./Login";
import Signup from "./Signup";
import NavBar from "./NavBar";
import Posts from "./Posts";
import Messages from "./Messages";
import Animals from "./Animals";
import TaggedAnimals from "./TaggedAnimals";

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
    })

    return (
        <div>
            {user === true ? (
                <>
                    <NavBar />
                    <Switch>
                        <Route exact path="/posts">
                            <Posts />
                        </Route>
                        <Route exact path="/messages">
                            <Messages />
                        </Route>
                        <Route exact path="/animals">
                            <Animals />
                        </Route>
                        <Route exact path="/tagged_animals">
                            <TaggedAnimals />
                        </Route>
                    </Switch>
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