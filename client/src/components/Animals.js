import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Animals() {
    // Maybe in future change to hold in redux state
    const [animals, setAnimals] = useState()
    const [addBtn, setAddBtn] = useState(false)

    useEffect(() => {
        fetch("/animals")
        .then((res) => res.json())
        .then((res) => setAnimals(res))
    }, [])
    
    return (
        <div id="animals_body">
            {addBtn === true ? (
                <>
                    <button id="add_animal_btn" onClick={() => setAddBtn(false)}>-</button>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" />

                        <label htmlFor="age">Age</label>
                        <input name="age" type="number" />

                        <label htmlFor="breed">Breed</label>
                        <input name="breed" type="text" />

                        <label htmlFor="species">Species</label>
                        <input name="species" type="text" />

                        <label htmlFor="location">Location</label>
                        <input name="location" type="text" />

                        <label for="sex_m">M</label>
                        <input type="radio" id="sex_m" name="sex" />
                        
                        <label for="sex_f">F</label>
                        <input type="radio" id="sex_f" name="sex" />

                        <label htmlFor="img">Picture</label>
                        <input type="text" name="img" />

                        <button type="submit">Add Animal</button>
                    </form>
                </>
            ) : (
                <button id="add_animal_btn" onClick={() => setAddBtn(true)}>+</button>
            )}
            
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