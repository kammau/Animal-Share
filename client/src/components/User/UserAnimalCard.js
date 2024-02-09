import React, { useState } from "react";
import { useFormik } from "formik";


function UserAnimalCard({animal, handleUpdate, handleDelete}) {
    const [mode, setMode] = useState("view")

    const formik = useFormik({
        initialValues: {
            name: animal.name,
            species: animal.species,
            breed: animal.breed,
            sex: animal.sex,
            age: animal.age,
            location: animal.location,
            img: animal.img
        },
        onSubmit: (values) => {
            fetch(`/my_account/animals/${animal.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => handleUpdate(res))

            setMode("view")
        }
    })


    return (
        <div className="animal_card">
            {mode === "view" ? (
                <>
                    <div className="animal_img_container">
                        <img src={animal.img} alt={`${animal.name}`} className="animal_img"/>
                    </div>
                    <div className="animal_text_container">
                        <h3 className="animal_name">{animal.name}</h3>
                        <p>Species: {animal.species}</p>
                        <p>Breed: {animal.breed}</p>
                        <p>Sex: {animal.sex}</p>
                        <p>Age: {animal.age}</p>
                        <p>Location: {animal.location}</p>
                        <p>Current Owner: {animal.currentOwner.username}</p>
                    </div>
                    <button onClick={() => setMode("edit")} className="edit_btn"><img className="edit_icon" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" alt="edit icon"/></button>
                    <button onClick={() => handleDelete(animal.id)} className="message_btn_trash"><img className="trash_icon" src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon"/></button>
                </>
            ) : (
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={formik.values.name} onChange={formik.handleChange} name="name" className="forms_inputs"/>

                        <label htmlFor="species">Species:</label>
                        <input type="text" value={formik.values.species} onChange={formik.handleChange} name="species" className="forms_inputs"/>


                        <div value={formik.values.sex} onChange={formik.handleChange}>
                            <label htmlFor="sex_m_">Male</label>
                            <input type="radio" id="sex_m_" name="sex" value="Male" />

                            <label htmlFor="sex_f_">Female</label>
                            <input type="radio" id="sex_f_" name="sex" value="Female" />
                        </div>

                        <label htmlFor="age">Age:</label>
                        <input type="number" value={formik.values.age} onChange={formik.handleChange} name="age" className="forms_inputs"/>

                        <label htmlFor="location">Location:</label>
                        <input type="text" value={formik.values.location} onChange={formik.handleChange} name="location" className="forms_inputs"/>

                        <label htmlFor="img">Image:</label>
                        <input type="text" value={formik.values.img} onChange={formik.handleChange} name="img" className="forms_inputs"/>

                        <button type="submit" className="update_btn">Update</button>
                    </form>
                    <button onClick={() => setMode("view")} className="cancel_btn">Cancel</button>
                </div>
            )}
        </div>
    )
}

export default UserAnimalCard;
