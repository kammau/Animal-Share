import React, { useEffect, useState } from "react";
import UserAnimalCard from "./UserAnimalCard";


function UserAnimals({user}) {
    const [animals, setAnimals] = useState()

    function handleUpdate(updatedAnimal) {
        let filteredAnimals = animals.filter((animal) => animal.id !== updatedAnimal.id)
        setAnimals([updatedAnimal, ...filteredAnimals])
    }
    
    useEffect(() => {
        fetch("/my_account/animals")
        .then((res) => res.json())
        .then((res) => setAnimals(res))
    }, [])

    return (
        <>
            <h1>{user.username} Animals</h1>
            {animals ? animals.map((animal) => <UserAnimalCard key={animal.id} animal={animal} handleUpdate={handleUpdate}/>): <h2>Looks like you don't have any animals!</h2>}
        </>
    )
}

export default UserAnimals;