import React, { useEffect, useState } from "react";
import TaggedAnimalCard from "./TaggedAnimalCard";

function TaggedAnimals() {
    const [taggedAnimals, setTaggedAnimals] = useState()

    useEffect(() => {
        fetch("/tagged_animals")
        .then((res) => res.json())
        .then((res) => setTaggedAnimals(res))
    }, [])

    return (
        <div>
            {taggedAnimals ? taggedAnimals.map((animal) => {
                return (
                    <TaggedAnimalCard animal={animal} setTaggedAnimals={setTaggedAnimals}/>
                )
            }) : <h1>Looks like you have not tagged any animals!</h1>}
        </div>
    )
}

export default TaggedAnimals;