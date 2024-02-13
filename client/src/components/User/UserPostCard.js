import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import * as yup from "yup";

function UserPostCard({post, handleUpdate, deletePost, tagAnimal}) {
    const [mode, setMode] = useState("view")
    const [userAnimals, setUserAnimals] = useState()
    const [animalPhoto, setAnimalPhoto] = useState(1)
    const [animalView, setAnimalView] = useState(false)

    useEffect(() => {
        fetch("/my_account/animals")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => setUserAnimals(res))
    }, [])

    const formSchema = yup.object().shape({
        title: yup.string().required("Please give your post a title"),
        postBody: yup.string().required("Please enter text for your post").min(10, "Must have at least 10 characters").max(200, "Must not exceed 200 characters"),
        numOfAnimals: yup.number().required("Please enter number of animals in post"),
        imgOne: yup.string().required("Must have at least one Animals image"),
        imgTwo: yup.string().notRequired(),
        imgThree: yup.string().notRequired()
    })

    function imageSrc(animalPhoto) {
        if (animalPhoto === 1) {
            return post.imgOne
        } 
        else if (animalPhoto === 2 && post.imgTwo !== "") {
            return post.imgTwo
        }
        else if (animalPhoto === 3 && post.imgThree !== "") {
            return post.imgThree
        }
    }

    function animalPhotoNum(animalPhoto) {
        if (animalPhoto === 1 && post.imgTwo !== "") {
            setAnimalPhoto(2)
        }
        else if (animalPhoto === 2 && post.imgThree !== "") {
            setAnimalPhoto(3)
        }
        else {
            setAnimalPhoto(1)
        }
    }

    const formik = useFormik({
        initialValues: {
            title: post.title,
            postBody: post.postBody,
            imgOne: post.imgOne,
            imgTwo: post.imgTwo,
            imgThree: post.imgThree,
            numOfAnimals: post.numOfAnimals,
            animals: []
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/my_account/posts/${post.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then((res) => res.json())
            .then(() => handleUpdate())

            setMode("view")
        }
    })

    return (
        <div className="post_card">
            {mode === "view" ? (
                <div>
                    <h1 className="post_title">{post.title}</h1>
                    <div>
                        <img src={imageSrc(animalPhoto)} alt={post.title} className="post_img"/>
                        <button onClick={() => animalPhotoNum(animalPhoto)} className="img_scroll_btns"><img src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="logout icon" className="tag_icon"/></button>
                    </div>
                    <h3 className="post_body">{post.postBody}</h3>
                    <br />
                    <button onClick={() => {animalView ? setAnimalView(false) : setAnimalView(true)}} className="animals_in_p_btn">
                        {animalView ? "X" : <img src="https://cdn-icons-png.flaticon.com/512/12/12638.png" className="tag_icon" alt="paw print"/>}
                    </button>
                    {animalView ? (
                        <div className="animals_in_posts">
                            {post.animals.length > 0 ? post.animals.map((animal) => {
                                return (
                                    <div className="animal_in_post" key={animal.id}>
                                        <h1>{animal.name}</h1>
                                        <img src={animal.img} className="post_animal_img" alt={`${animal.name}`} />
                                        <p>Species: {animal.species}</p>
                                        <p>Breed: {animal.breed}</p>
                                        <p>Age: {animal.age}</p>
                                        <NavLink to={`/animals/${animal.id}`}><button className="post_more">MORE</button></NavLink>
                                        <button onClick={() => tagAnimal(animal.id)}className="animal_post_tag">
                                            <img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/>
                                        </button>
                                    </div>
                                )
                            }) : <h3>Looks like this post does not have any animals!</h3>}
                        </div>
                    ) : null}
                    <button onClick={() => deletePost(post)} className="message_btn_trash"><img src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon" className="trash_icon"/></button>
                    <button onClick={() => setMode("edit")} className="edit_btn"><img className="edit_icon" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" alt="edit icon"/></button>
                </div>
            ) : (
                <div>
                    <form onSubmit={formik.handleSubmit} className="forms_container">
                        <label htmlFor="title">Title:</label>
                        <br />
                        <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} className="forms_inputs"/>
                        <p className="form_errors">{formik.errors.title}</p>

                        <br />
                        <label htmlFor="postBody">Post Body:</label>
                        <input type="text" name="postBody" value={formik.values.postBody} onChange={formik.handleChange} className="forms_inputs"/>
                        <p className="form_errors">{formik.errors.postBody}</p>

                        <br />
                        <label htmlFor="imgOne">First Image:</label>
                        <input type="text" name="imgOne" value={formik.values.imgOne} onChange={formik.handleChange} className="forms_inputs"/>
                        <p className="form_errors">{formik.errors.imgOne}</p>

                        <br />
                        <label htmlFor="imgTwo">Second Image:</label>
                        <input type="text" name="imgTwo" value={formik.values.imgTwo} onChange={formik.handleChange} className="forms_inputs"/>
                        <p className="form_errors">{formik.errors.imgTwo}</p>

                        <br />
                        <label htmlFor="imgThree">Third Image:</label>
                        <input type="text" name="imgThree" value={formik.values.imgThree} onChange={formik.handleChange}  className="forms_inputs"/>
                        <p className="form_errors">{formik.errors.imgThree}</p>

                        <select name="numOfAnimals" onChange={formik.handleChange} values={formik.values.numOfAnimals} className="forms_inputs" id="animal_num_spec">
                            <option disabled>Select Number of Animals</option>
                            <option name="one" value={1}>1</option>
                            <option name="two" value={2}>2</option>
                            <option name="three" value={3}>3</option>
                        </select>
                        <p className="form_errors">{formik.errors.numOfAnimals}</p>

                        <div id="animal_select_spec">
                            {userAnimals ? userAnimals.map((animal) => {
                                return (
                                    <>
                                        <input id={animal.name} type="checkbox" onChange={() => formik.values.animals.push(animal)} name="animals" value={animal}/>
                                        <label htmlFor={`${animal.name}`}>{animal.name}</label>
                                    </>
                                )
                            }) : <p>Looks like you don't have any animals to choose from!</p>}
                        </div>

                        <button type="submit" className="update_btn">Update</button>
                    </form>
                    <button onClick={() => setMode("view")} className="cancel_btn2">Cancel</button>
                </div>
            )}
        </div>
    )
}

export default UserPostCard;