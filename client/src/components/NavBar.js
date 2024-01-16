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
        <div id="navbar">
            <NavLink to="/posts" className="navbar_links" exact>POSTS</NavLink>
            <NavLink to="/messages" className="navbar_links" exact>MESSAGES</NavLink>
            <NavLink to="/animals" className="navbar_links" exact>ANIMALS</NavLink>
            <NavLink to="/tagged_animals" className="navbar_links" exact>TaggedAnimals</NavLink>
            <button onClick={handleLogout}><img src="https://www.iconpacks.net/icons/2/free-exit-logout-icon-2857-thumb.png" alt="logout icon" id="logout_icon"/></button>
        </div>
    )
}

export default NavBar;