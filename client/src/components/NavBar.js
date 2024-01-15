import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { logOut } from "./reducers/sessionSlice";

function NavBar() {
    const dispatch = useDispatch();

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE"
        })
        .then((res) => {
            if (res.ok) {
                dispatch(logOut())
            }
        })
    }

    return (
        <div>
            <NavLink to="/posts" exact>POSTS</NavLink>
            <NavLink to="/messages" exact>MESSAGES</NavLink>
            <NavLink to="/animals" exact>ANIMALS</NavLink>
            <NavLink to="/tagged_animals" exact>TaggedAnimals</NavLink>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default NavBar;