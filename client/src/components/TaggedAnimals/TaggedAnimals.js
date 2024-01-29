import React, { useEffect, useState } from "react";
import TaggedAnimalCard from "./TaggedAnimalCard";

function TaggedAnimals() {
    const [taggedAnimals, setTaggedAnimals] = useState()
    
    useEffect(() => {
        fetch("/tagged_animals")
        .then((res) => res.json())
        .then((res) => {
            setTaggedAnimals(res)
            console.log(res)
        })
    }, [])

    return (
        <div>
            {taggedAnimals ? taggedAnimals.map((animal) => {
                return (
                    <TaggedAnimalCard key={animal.id} animal={animal} setTaggedAnimals={setTaggedAnimals}/>
                )
            }) : <h1>Looks like you don't have any tagged animals!</h1>}
        </div>
    )
}

export default TaggedAnimals;
