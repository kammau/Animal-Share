import React from "react";

function UserAnimals({user}) {
    console.log(user.currentAnimals)

    return (
        <h1>{user.username} Animals</h1>
    )
}

export default UserAnimals;