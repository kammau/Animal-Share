import React, { useEffect, useState } from "react";

function NewMessage() {
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch("/users")
        .then((res) => res.json())
        .then((res) => setUsers(res))
    }, [])


    return (
        <div>
            <form>
                <input type="text" />

                <select>
                    {users ? users.map((user) => <option value={user.username}>{user.username}</option>) : null}
                </select>

                <textarea rows="5" cols="33"></textarea>
            </form>
        </div>
    )
}

export default NewMessage;