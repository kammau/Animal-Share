import React, { useEffect, useState } from "react";

function UserPosts({user}) {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/my_account/posts")
        .then((res) => console.log(res))
    })
    return (
        <>
            <h1>{user.username} Posts</h1>
            <div>
                <h1></h1>
            </div>
        </>
    )
}

export default UserPosts;
