import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import NewPostForm from "./NewPostForm";

function Posts() {
    const [posts, setPosts] = useState()
    const [addBtn, setAddBtn] = useState(false)

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
            {addBtn ? (
                <NewPostForm setAddBtn={setAddBtn} posts={posts} setPosts={setPosts}/>
            ) : (
                <button onClick={() => setAddBtn(true)}>+</button>
            )}

            {posts ? posts.map((post) => <PostCard post={post} tagAnimal={tagAnimal}/>) : null}
        </div>
    )
}

export default Posts;