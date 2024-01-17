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
            <div id="animal_cards_container">
                {animals ? animals.map((animal) => {
                    return (
                        <div className="animal_card" key={animal.id}>
                            <div className="animal_img_container">
                                <img src={animal.img} alt={`${animal.name}`} className="animal_img"/>
                            </div>
                            <div className="animal_text_container">
                                <h3>Name: {animal.name}</h3>
                                <p>Species: {animal.species}</p>
                                <p>Breed: {animal.breed}</p>
                                <p>Sex: {animal.sex}</p>
                                <p>Age: {animal.age}</p>
                                <p>Location: {animal.location}</p>
                            </div>
                        </div>
                    )
                }) : <h1>Error!</h1>}
            </div>
        </div>
    )
}

export default Animals;