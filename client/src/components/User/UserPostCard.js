import React, { useState } from "react";
import { useFormik } from "formik";

function UserPostCard({post}) {
    const [mode, setMode] = useState("view")

    const formik = useFormik({
        initialValues: {
            title: post.title,
            postBody: post.postBody,
            imgOne: post.imgOne,
            imgTwo: post.imgTwo,
            imgThree: post.imgThree,
            numOfAnimals: post.numOfAnimals,
            
        }
    })

    return (
        <div>
            {mode === "view" ? (
                <div className="post_card">
                    <h1 className="post_title">{post.title}</h1>
                    <img src={post.img} alt={post.title} className="post_img"/>
                    <h3 className="post_body">{post.postBody}</h3>
                    <br />
                    {post.animals ? post.animals.map((animal) => {
                            return (
                                <div className="animal_in_post">
                                    <h1>{animal.name}</h1>
                                    <p>Species: {animal.species}</p>
                                    <p>Breed: {animal.breed}</p>
                                    <p>Age: {animal.age}</p>
                                </div>
                            )
                    }) : null}
                    <button onClick={() => setMode("edit")}><img className="edit_icon" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" alt="edit icon"/></button>
                </div>
            ) : (
                <div className="post_card">
                    <h1>edit</h1>
                    <button onClick={() => setMode("view")}>Cancel</button>
                </div>
            )}
        </div>
    )
}

export default UserPostCard;