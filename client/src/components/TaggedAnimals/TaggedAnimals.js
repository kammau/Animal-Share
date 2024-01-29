import React, { useEffect, useState } from "react";
import TaggedAnimalCard from "./TaggedAnimalCard";

function TaggedAnimals() {
    const [taggedAnimals, setTaggedAnimals] = useState()
    
    useEffect(() => {
        fetch("/tagged_animals")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => {
            setTaggedAnimals(res)
        })
    }, [])

    return (
        <div className="animal_cards_container">
            {taggedAnimals ? taggedAnimals.map((animal) => {
                return (
                    <TaggedAnimalCard key={animal.id} animal={animal} setTaggedAnimals={setTaggedAnimals}/>
                )
            }) : <h1 id="no_tagged_animals_header">Looks like you don't have any tagged animals!</h1>}
        </div>
    )
}

export default TaggedAnimals;
