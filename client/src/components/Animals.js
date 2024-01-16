import React, { useEffect, useState } from "react";

function Animals() {
    // Maybe in future change to hold in redux state
    const [animals, setAnimals] = useState()

    useEffect(() => {
        fetch("/animals")
        .then((res) => res.json())
        .then((res) => setAnimals(res))
    }, [])
    
    return (
        <div id="animals_body">
            <h1>Animals!</h1>
            <div id="animal_card_container">
                {animals ? animals.map((animal) => {
                    return (
                        <div className="animal_card" key={animal.id}>
                            <h1>{animal.name}</h1>
                        </div>
                    )
                }) : <h1>Error!</h1>}
            </div>
        </div>
    )
}

export default Animals;