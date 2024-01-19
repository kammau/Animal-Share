import React, { useEffect, useState } from "react";
import SearchAnimals from "./SearchAnimals";
import AddAnimalForm from "./AddAnimalForm";
import AnimalCard from "./AnimalCard";

function Animals() {
    // Maybe in future change to hold in redux state
    const [animals, setAnimals] = useState([])
    const [addBtn, setAddBtn] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [searchBy, setSearchBy] = useState("Breed")

    useEffect(() => {
        fetch("/animals")
        .then((res) => res.json())
        .then((res) => setAnimals(res))
    }, [])

    const animalSearch = animals.filter((animal) => {
        if (searchBy === "Breed") {
            return animal.breed.toLowerCase().includes(searchValue.toLowerCase())
        }
        else if (searchBy === "Age") {
            return animal.age === Number(searchValue)
        }
        else if (searchBy === "Species") {
            return animal.species.toLowerCase().includes(searchValue.toLowerCase())
        }
        else if (searchBy === "Sex") {
            return animal.sex.toLowerCase().includes(searchValue.toLowerCase())
        }

        return <h1>Looks like we don't have what your looking for!</h1>
    })

    function tagAnimal(id) {
        console.log(id)
        fetch("/animals", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
    }
    
    return (
        <div id="animals_body">

            {/* ADD ANIMAL FORM: */}
            {addBtn === true ? (
                <AddAnimalForm animals={animals} setAnimals={setAnimals} setAddBtn={setAddBtn}/>
            ) : (
                <button id="add_animal_btn" onClick={() => setAddBtn(true)}>+</button>
            )}

            {/* SEARCH ANIMAL'S */}
            <SearchAnimals searchValue={searchValue} onSearchChange={setSearchValue} setSearchBy={setSearchBy}/>
            
            {/* ANIMAL CARD'S */}
            <div id="animal_cards_container">
                {animalSearch ? animalSearch.map((animal) => {
                    return (
                        <AnimalCard animal={animal} tagAnimal={tagAnimal}/>
                    )
                }) : <h1>Error!</h1>}
            </div>
        </div>
    )
}

export default Animals;