import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

function Posts() {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/posts")
        .then((res) => res.json())
        .then((res) => setPosts(res))
    }, [])

    function tagAnimal(id) {
        fetch(`/animals/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
    }

    return (
        <div>
            {posts ? posts.map((post) => <PostCard post={post} tagAnimal={tagAnimal}/>) : null}
        </div>
    )
}

export default Posts;