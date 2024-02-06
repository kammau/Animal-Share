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
        <div className="animal_cards_container">
            {animals ? animals.map((animal) => <UserAnimalCard key={animal.id} animal={animal} handleUpdate={handleUpdate} handleDelete={handleDelete}/>): <h2 className="page_headers">Looks like you don't have any animals!</h2>}
        </div>
    )
}

export default UserAnimals;