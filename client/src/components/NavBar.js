import React from "react";
import { useDispatch } from "react-redux";

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
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}

export default NavBar;