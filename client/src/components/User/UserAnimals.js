import React, { useEffect, useState } from "react";
import AnimalCard from "../Animal/AnimalCard"

function UserAnimals({user}) {
    const [animals, setAnimals] = useState()
    
    useEffect(() => {
        fetch("/my_account/animals")
        .then((res) => res.json())
        .then((res) => setAnimals(res))
    }, [])

    return (
        <>
            <h1>{user.username} Animals</h1>
        </>
    )
}

export default UserAnimals;