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

    function handleUpdate(updatedPost) {
        if (posts.length > 0) {
            let filteredPosts = posts.filter((post) => post.id !== updatedPost.id)
            setPosts([filteredPosts, {...updatedPost}])
        } else {
            setPosts(updatedPost)
        }
    }

    return (
        <>
            <h1>{user.username} Posts</h1>
            <div>
                {posts ? posts.map((post) => <UserPostCard key={post.id} post={post} handleUpdate={handleUpdate}/>) : <h1>Looks like you don't have any posts!</h1>}
            </div>
        </>
    )
}

export default UserPosts;
