import React, { useEffect, useState } from "react";

function TaggedAnimals() {
    const [taggedAnimals, setTaggedAnimals] = useState()

    useEffect(() => {
        fetch("/tagged_animals")
        .then((res) => res.json())
        .then((res) => console.log(res))
    })

    return (
        <h1>TaggedAnimals!</h1>
    )
}

export default TaggedAnimals;