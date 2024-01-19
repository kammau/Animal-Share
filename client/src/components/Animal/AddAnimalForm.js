import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddAnimalForm({animals, setAnimals, setAddBtn}) {
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
        <div>
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
        </div>
    )
}

export default AddAnimalForm;