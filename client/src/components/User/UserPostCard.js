import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

function UserPostCard({post, handleUpdate, deletePost}) {
    const [mode, setMode] = useState("view")
    const [userAnimals, setUserAnimals] = useState()

    useEffect(() => {
        fetch("/my_account/animals")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => setUserAnimals(res))
    }, [])

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
        <div>
            {mode === "view" ? (
                <div className="post_card">
                    <h1 className="post_title">{post.title}</h1>
                    <img src={post.imgOne} alt={post.title} className="post_img"/>
                    <img src={post.imgTwo} alt={post.title} className="post_img" />
                    <img src={post.imgThree} alt={post.title} className="post_img" />
                    <h3 className="post_body">{post.postBody}</h3>
                    <br />
                    {post.animals ? post.animals.map((animal) => {
                            return (
                                <div className="animal_in_post" key={animal.id}>
                                    <h1>{animal.name}</h1>
                                    <p>Species: {animal.species}</p>
                                    <p>Breed: {animal.breed}</p>
                                    <p>Age: {animal.age}</p>
                                </div>
                            )
                    }) : null}
                    <button onClick={() => deletePost(post)} className="message_btn_trash"><img src="https://cdn-icons-png.flaticon.com/512/1843/1843344.png" alt="trash icon" className="trash_icon"/></button>
                    <button onClick={() => setMode("edit")}><img className="edit_icon" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" alt="edit icon"/></button>
                </div>
            ) : (
                <div className="post_card">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />

                        <label htmlFor="postBody">Post Body:</label>
                        <input type="text" name="postBody" value={formik.values.postBody} onChange={formik.handleChange}/>

                        <label htmlFor="imgOne">First Image:</label>
                        <input type="text" name="imgOne" value={formik.values.imgOne} onChange={formik.handleChange}/>

                        <label htmlFor="imgTwo">Second Image:</label>
                        <input type="text" name="imgTwo" value={formik.values.imgTwo} onChange={formik.handleChange}/>

                        <label htmlFor="imgThree">Third Image:</label>
                        <input type="text" name="imgThree" value={formik.values.imgThree} onChange={formik.handleChange} />

                        <select name="numOfAnimals" onChange={formik.handleChange} values={formik.values.numOfAnimals}>
                            <option disabled>Select Number of Animals</option>
                            <option name="one" value={1}>1</option>
                            <option name="two" value={2}>2</option>
                            <option name="three" value={3}>3</option>
                        </select>

                        <div>
                            {userAnimals ? userAnimals.map((animal) => {
                                return (
                                    <>
                                        <input id={animal.name} type="checkbox" onChange={() => formik.values.animals.push(animal)} name="animals" value={animal}/>
                                        <label htmlFor={`${animal.name}`}>{animal.name}</label>
                                    </>
                                )
                            }) : <p>Looks like you don't have any animals to choose from!</p>}
                        </div>

                        <button type="submit">Update</button>
                    </form>
                    <button onClick={() => setMode("view")}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default UserPostCard;