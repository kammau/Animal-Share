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
            <button className="add_btn" onClick={() => setAddBtn(false)}>-</button>
            <div className="forms_container">
                <h2 className="forms_header">ADD AN ANIMAL</h2>
                <br />
                <br />
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    
                    <div id="main_add_animal">
                        <input name="name" type="text" value={formik.values.name} onChange={formik.handleChange} placeholder="NAME" className="forms_inputs"/>
                        <p>{formik.errors.name}</p>

                        <input name="age" type="number" value={formik.values.age} onChange={formik.handleChange} placeholder="AGE" className="forms_inputs"/>
                        <p>{formik.errors.age}</p>

                        <input name="breed" type="text" value={formik.values.breed} onChange={formik.handleChange} placeholder="BREED" className="forms_inputs"/>
                        <p>{formik.errors.breed}</p>

                        <input name="species" type="text" value={formik.values.species} onChange={formik.handleChange}  placeholder="SPECIES" className="forms_inputs"/>
                        <p>{formik.errors.species}</p>

                        <input name="location" type="text" value={formik.values.location} onChange={formik.handleChange} placeholder="LOCATION (OPTIONAL)" className="forms_inputs"/>

                        <div value={formik.values.sex} onChange={formik.handleChange} id="sex_select">
                            <label htmlFor="sex_m">Male</label>
                            <input type="radio" id="sex_m" name="sex" value={"Male"}/>

                            <label htmlFor="sex_f">Female</label>
                            <input type="radio" id="sex_f" name="sex" value={"Female"}/>
                            <p>{formik.errors.sex}</p>
                        </div>

                        <input type="text" name="img" value={formik.values.img} onChange={formik.handleChange} placeholder="IMAGE URL" className="forms_inputs"/>
                        <p>{formik.errors.img}</p>
                    </div>

                    <button type="submit" className="forms_btn">Add</button>
                </form>
            </div>
        </>
    )
}

export default AddAnimalForm;