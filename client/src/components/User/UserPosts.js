import React, { useEffect, useState } from "react";
import UserPostCard from "./UserPostCard";

function UserPosts({user}) {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/my_account/posts")
        .then((res) => res.json())
        .then((res) => setPosts(res))
    }, [])
    return (
        <>
            <h1>{user.username} Posts</h1>
            <div>
                {posts ? posts.map((post) => <UserPostCard key={post.id} post={post} />) : <h1>Looks like you don't have any posts!</h1>}
            </div>
        </>
    )
}

export default UserPosts;
