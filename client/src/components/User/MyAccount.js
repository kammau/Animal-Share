import React, { useEffect, useState } from "react";
import UserPosts from "./UserPosts";
import UserAnimals from "./UserAnimals";
import Settings from "./Settings";

function MyAccount() {
    const [user, setUser] = useState()
    const [view, setView] = useState("posts")

    useEffect(() => {
        fetch("/my_account")
        .then((res) => res.json())
        .then((res) => setUser(res))
    }, [])

    function viewFunc() {
        if (view === "posts") {
            return <UserPosts user={user}/>
        }
        else if (view === "animals") {
            return <UserAnimals user={user} />
        }
        else if (view === "settings") {
            return <Settings user={user} />
        }
    }

    if (!user) return <h1>Loading...</h1>

    return (
        <div>
            <h1 className="page_headers">Hello {user.username}!</h1>

            <div id="account_btns_container">
                <button onClick={() => setView("posts")} className="account_btns">POSTS</button>
                <button onClick={() => setView("animals")} className="account_btns">ANIMALS</button>
                <button onClick={() => setView("settings")} className="account_btns">SETTINGS</button>
            </div>

            {viewFunc()}
        </div>
    )
}

export default MyAccount;