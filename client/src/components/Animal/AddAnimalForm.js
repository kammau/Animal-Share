import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddAnimalForm({animals, setAnimals, setAddBtn}) {
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter your animals name"),
        age: yup.number().required("Please enter your animals age"),
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
        onSubmit: (values, {resetForm}) => {
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

            resetForm()
        }
    })


    return (
        <>
            <button id="add_animal_btn" onClick={() => setAddBtn(false)}>-</button>
            <div id="animal_form_container">
                <h2 id="animal_form_header">ADD AN ANIMAL</h2>
                <br />
                <br />
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <input name="name" type="text" value={formik.values.name} onChange={formik.handleChange} className="animal_form_inputs" placeholder="NAME"/>
                    <p>{formik.errors.name}</p>

                    <input name="age" type="number" value={formik.values.age} onChange={formik.handleChange} className="animal_form_inputs" placeholder="AGE"/>
                    <p>{formik.errors.age}</p>

                    <input name="breed" type="text" value={formik.values.breed} onChange={formik.handleChange} className="animal_form_inputs" placeholder="BREED"/>
                    <p>{formik.errors.breed}</p>

                    <input name="species" type="text" value={formik.values.species} onChange={formik.handleChange} className="animal_form_inputs" placeholder="SPECIES"/>
                    <p>{formik.errors.species}</p>

                    <input name="location" type="text" value={formik.values.location} onChange={formik.handleChange} className="animal_form_inputs" placeholder="LOCATION (OPTIONAL)"/>

                    <div value={formik.values.sex} onChange={formik.handleChange} className="animal_form_inputs">
                        <label htmlFor="sex_m">Male</label>
                        <input type="radio" id="sex_m" name="sex" value={"Male"}/>

                        <label htmlFor="sex_f">Female</label>
                        <input type="radio" id="sex_f" name="sex" value={"Female"}/>
                        <p>{formik.errors.sex}</p>
                    </div>

                    <input type="text" name="img" value={formik.values.img} onChange={formik.handleChange} className="animal_form_inputs" placeholder="IMAGE URL"/>
                    <p>{formik.errors.img}</p>

                    <button type="submit" id="animal_form_sub_btn">Add Animal</button>
                </form>
            </div>
        </>
    )
}

export default AddAnimalForm;