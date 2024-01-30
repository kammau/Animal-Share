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
            <NavLink to="/posts" className="navbar_titles" data-item="Posts" exact>POSTS</NavLink>
            <NavLink to="/messages" className="navbar_titles" data-item="Messages" exact>MESSAGES</NavLink>
            <NavLink to="/animals" className="navbar_titles" data-item="Animals" exact>ANIMALS</NavLink>
            <NavLink to="/tagged_animals" className="navbar_titles" data-item="TaggedAnimals" exact>TAGGED ANIMALS</NavLink>
            <NavLink to="/my_account" className="navbar_titles" data-item="MyAccount" exact>MY ACCOUNT</NavLink>
            <button onClick={handleLogout} id="logout_btn" className="navbar_titles"><img src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="logout icon" id="logout_icon"/></button>
        </div>
    )
}

export default NavBar;