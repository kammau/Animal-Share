import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./reducers/sessionSlice";
import store from "../store"

import Login from "./User/Login";
import Signup from "./User/Signup";
import NavBar from "./NavBar";
import Posts from "./Post/Posts";
import Messages from "./Message/Messages";
import Animals from "./Animal/Animals";
import TaggedAnimals from "./TaggedAnimals/TaggedAnimals";
import MyAccount from "./User/MyAccount";

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
                        <Route exact path="/my_account">
                            <MyAccount />
                        </Route>
                    </Switch>
                </>
            ) : (
                <div>
                    <Signup />
                    {view === "login" ? (
                        <Route exact path="/login">
                            <Login />
                        </Route>
                    ) : (
                        <Route  path="/signup">
                            <Signup />
                        </Route>
                    )}
                </div>
            )}
        </div>
    )
}

export default App;