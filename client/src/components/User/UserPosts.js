import React, { useEffect, useState } from "react";
import UserPostCard from "./UserPostCard";

function UserPosts({user}) {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/my_account/posts")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => {
            setPosts(res)
            console.log(res)
        })
    }, [])

    function handleUpdate() {
        fetch("/my_account/posts")
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then((res) => setPosts(res))
    }

    function deletePost(post) {
        fetch(`/my_account/posts/${post.id}`, {
            method: "DELETE",
        })
        .then(() => {
            if (posts.length > 0) {
                let updatedPosts = posts.filter((p) => p.id !== post.id)
                setPosts(updatedPosts)
            } else {
                setPosts()
            }
        })
    }

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
        <>
            <div className="posts_body">
                {posts ? posts.map((post) => <UserPostCard key={post.id} post={post} handleUpdate={handleUpdate} deletePost={deletePost} tagAnimal={tagAnimal}/>) : <h1 className="page_headers">Looks like you don't have any posts!</h1>}
            </div>
        </>
    )
}

export default UserPosts;
