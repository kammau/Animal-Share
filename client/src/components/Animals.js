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

    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter your animals name"),
        age: yup.number().required("Please enter your animals name"),
        breed: yup.string().required("Please enter your animals breed"), // Maybe add if unknown breed message
        species: yup.string().required("Please enter your animals species"),
        location: yup.string(),
        sex: yup.string(),
        img: yup.string().required("Please enter a picture of your animal")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            age: 0,
            breed: "",
            species: "",
            location: "",
            sex: "",
            img: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/animals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => {
                const updatedAnimals = [...animals, res]
                setAnimals(updatedAnimals)
            })
        }
    })
    
    return (
        <div id="animals_body">

            {/* ADD ANIMAL FORM: */}

            {addBtn === true ? (
                <>
                    <button id="add_animal_btn" onClick={() => setAddBtn(false)}>-</button>
                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" value={formik.values.name} onChange={formik.handleChange}/>
                        <p>{formik.errors.name}</p>

                        <label htmlFor="age">Age</label>
                        <input name="age" type="number" value={formik.values.age} onChange={formik.handleChange}/>
                        <p>{formik.errors.age}</p>

                        <label htmlFor="breed">Breed</label>
                        <input name="breed" type="text" value={formik.values.breed} onChange={formik.handleChange}/>
                        <p>{formik.errors.breed}</p>

                        <label htmlFor="species">Species</label>
                        <input name="species" type="text" value={formik.values.species} onChange={formik.handleChange}/>
                        <p>{formik.errors.species}</p>

                        <label htmlFor="location">Location (Optional)</label>
                        <input name="location" type="text" value={formik.values.location} onChange={formik.handleChange}/>

                        <div value={formik.values.sex} onChange={formik.handleChange}>
                            <label htmlFor="sex_m">Male</label>
                            <input type="radio" id="sex_m" name="sex" value={"Male"}/>

                            <label htmlFor="sex_f">Female</label>
                            <input type="radio" id="sex_f" name="sex" value={"Female"}/>
                            <p>{formik.errors.sex}</p>
                        </div>

                        <label htmlFor="img">Picture</label>
                        <input type="text" name="img" value={formik.values.img} onChange={formik.handleChange}/>
                        <p>{formik.errors.img}</p>

                        <button type="submit">Add Animal</button>
                    </form>
                </>
            ) : (
                <button id="add_animal_btn" onClick={() => setAddBtn(true)}>+</button>
            )}
            
            {/* ANIMAL CARD'S */}

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
                            <button onClick={() => tagAnimal(animal.id)}><img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/></button>
                        </div>
                    )
                }) : <h1>Error!</h1>}
            </div>
        </div>
    )
}

export default Animals;