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
        .then((res) => {
            setAnimals(res)
        })
    }, [])

    function animalSearch(animals) {
        let animalsFiltered = animals.filter((animal) => {
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
            return animals
        })

        return (
            animalsFiltered.map((animal) => {
                return <AnimalCard key={animal.id} animal={animal} tagAnimal={tagAnimal} />
            })
        )
    }

    function tagAnimal(animal) {
        fetch(`/animals/${animal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
    }

    
    return (
        <div>

            {/* SEARCH ANIMAL'S */}
            <SearchAnimals searchValue={searchValue} onSearchChange={setSearchValue} setSearchBy={setSearchBy}/>

            {/* ADD ANIMAL FORM: */}
            {addBtn === true ? (
                    <AddAnimalForm animals={animals} setAnimals={setAnimals} setAddBtn={setAddBtn}/>
                ) : (
                    <button className="add_btn" onClick={() => setAddBtn(true)}>+</button>
            )}
            
            {/* ANIMAL CARD'S */}
            <div className="animal_cards_container">
                {animals ? animalSearch(animals) : <h1>Error!</h1>}
            </div>
        </div>
    )
}

export default Animals;