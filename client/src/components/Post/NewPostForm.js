import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewPostForm({setAddBtn, setPosts, posts}) {
    const [animals, setAnimals] = useState()

    useEffect(() => {
        fetch("/my_account")
        .then((res) => res.json())
        .then((res) => setAnimals(res.currentAnimals))
    }, [])

    const formSchema = yup.object().shape({
        title: yup.string().required("Please give your post a title"),
        postBody: yup.string().required("Please enter text for your post").min(10, "Must have at least 10 characters").max(200, "Must not exceed 200 characters"),
        numOfAnimals: yup.number().required("Please enter number of animals in post"),
        imgOne: yup.string().required("Must have at least one Animals image"),
        imgTwo: yup.string().notRequired(),
        imgThree: yup.string().notRequired(),
        animals: yup.array().required("Please Select at least one animal").max(3, "Please Select Only Three Animals")
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            postBody: "",
            numOfAnimals: 1,
            imgOne: "",
            imgTwo: "",
            imgThree: "",
            animals: [],
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then((res) => setPosts([...posts, res]))
        }
    })


    return (
        <>
            <button onClick={() => setAddBtn(false)} className="add_btn">-</button>
            <div className="forms_container">
                <h1 className="forms_header">ADD A POST</h1>
                <br />

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div id="main_post_div">
                        <input name="title" type="text" placeholder="Title" value={formik.values.title} onChange={formik.handleChange} className="forms_inputs"/>
                        <p>{formik.errors.title}</p>

                        <input name="postBody" type="text" placeholder="Body" value={formik.values.postBody} onChange={formik.handleChange} className="forms_inputs"/>
                        <p>{formik.errors.postBody}</p>

                        <select name="numOfAnimals" onChange={formik.handleChange} values={formik.values.numOfAnimals} className="forms_inputs">
                            <option disabled>Select Number of Animals</option>
                            <option name="one" value={1}>1</option>
                            <option name="two" value={2}>2</option>
                            <option name="three" value={3}>3</option>
                        </select>
                        <p>{formik.errors.numOfAnimals}</p>


                        <input name="imgOne" type="text" placeholder="First Animal Image" value={formik.values.imgOne} onChange={formik.handleChange} className="forms_inputs"/>
                        <p>{formik.errors.imgOne}</p>

                        <input name="imgTwo" type="text" placeholder="Second Animal Image (Optional)" value={formik.values.imgTwo} onChange={formik.handleChange} className="forms_inputs"/>
                        <br />

                        <input name="imgThree" type="text" placeholder="Third Animal Image (Optional)" value={formik.values.imgThree} onChange={formik.handleChange} className="forms_inputs"/>
                    </div>

                    <div id="animals_select">
                        <h2>Please Select 1-3 Animals</h2>
                        {animals ? animals.map((animal) => {
                            return (
                                <>
                                    <input type="checkbox" onChange={() => formik.values.animals.push(animal)} name={`${animal.name}`} value={formik.values.animals}/>
                                    <label htmlFor={`${animal.name}`}>{animal.name}</label>
                                </>
                            )
                        }) : <p>Looks like you don't have any animals to choose from!</p>}
                        <p>{formik.errors.animals}</p>
                    </div>
                    
                    <button type="submit" className="forms_btn">Post</button>
                </form>
            </div>
        </>
    )
}

export default NewPostForm;