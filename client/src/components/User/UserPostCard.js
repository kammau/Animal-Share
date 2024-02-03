import React, { useState } from "react";

function UserPostCard({post}) {
    const [mode, setMode] = useState("view")

    return (
        <div>
            <h1>{post.title}</h1>
            {mode === "view" ? (
                <>
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
                    <button></button>
                </>
            ) : (
                <h1>edit</h1>
            )}
        </div>
    )
}

export default UserPostCard;