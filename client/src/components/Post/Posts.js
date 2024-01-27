import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

function Posts() {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/posts")
        .then((res) => res.json())
        .then((res) => setPosts(res))
    }, [])

    return (
        <div>
            <h1>{console.log(posts)}</h1>
            {posts ? posts.map((post) => <PostCard post={post} />) : null}
        </div>
    )
}

export default Posts;