import React, { useEffect, useState } from "react";
import UserAnimalCard from "./UserAnimalCard";


function UserAnimals({user}) {
    const [animals, setAnimals] = useState()

    function handleUpdate(updatedAnimal) {
        let filteredAnimals = animals.filter((animal) => animal.id !== updatedAnimal.id)
        setAnimals([updatedAnimal, ...filteredAnimals])
    }

    function handleDelete(deletedAnimal) {
        fetch(`/my_account/animals/${deletedAnimal}`, {
            method: "DELETE",
        })
        .then(() => {
            if (animals.length > 0) {
                let filteredAnimals = animals.filter((animal) => animal.id !== deletedAnimal)
                setAnimals([...filteredAnimals])
            } else {
                setAnimals()
            }
        })
    }
    
    useEffect(() => {
        fetch("/my_account/animals")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => setAnimals(res))
    }, [])

    return (
        <>
            <h1>{user.username} Animals</h1>
            {animals ? animals.map((animal) => <UserAnimalCard key={animal.id} animal={animal} handleUpdate={handleUpdate} handleDelete={handleDelete}/>): <h2>Looks like you don't have any animals!</h2>}
        </>
    )
}

export default UserAnimals;