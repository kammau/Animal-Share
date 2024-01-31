import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function NewPostForm({setAddBtn}) {

    const formSchema = yup.object().shape({
        title: yup.string().required("Please give your post a title"),
        postBody: yup.string().required("Please enter text for your post").min(10, "Must have at least 10 characters").max(200, "Must not exceed 200 characters"),
        numOfAnimals: yup.number().required("Please enter number of animals in post"),
        imgOne: yup.string().required("Must have at least one Animals image"),
        imgTwo: yup.string().notRequired(),
        imgThree: yup.string().notRequired()
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            postBody: "",
            numOfAnimals: 1,
            imgOne: "",
            imgTwo: "",
            imgThree: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })


    return (
        <>
            <button onClick={() => setAddBtn(false)}>-</button>
            <div>
                <h1>ADD A POST</h1>
                <h2>Max Animals Per Post is 3</h2>
                <br />

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <input name="title" type="text" placeholder="Title" value={formik.values.title} onChange={formik.handleChange}/>
                    <p>{formik.errors.title}</p>

                    <input name="postBody" type="text" placeholder="Body" value={formik.values.postBody} onChange={formik.handleChange}/>
                    <p>{formik.errors.postBody}</p>

                    <select name="numOfAnimals" onChange={formik.handleChange} values={formik.values.numOfAnimals}>
                        <option disabled>Select Number of Animals</option>
                        <option name="one" value={1}>1</option>
                        <option name="two" value={2}>2</option>
                        <option name="three" value={3}>3</option>
                    </select>
                    <p>{formik.errors.numOfAnimals}</p>

                    <input name="imgOne" type="text" placeholder="First Animal Image" value={formik.values.imgOne} onChange={formik.handleChange}/>
                    <p>{formik.errors.imgOne}</p>

                    <input name="imgTwo" type="text" placeholder="Second Animal Image (Optional)" value={formik.values.imgTwo} onChange={formik.handleChange}/>
                    <input name="imgThree" type="text" placeholder="Third Animal Image (Optional)" value={formik.values.imgThree} onChange={formik.handleChange}/>
                    
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default NewPostForm;