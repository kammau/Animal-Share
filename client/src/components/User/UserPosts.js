import React from "react";

function UserPosts({user}) {

    console.log(user.posts)
    return (
        <h1>{user.username} Posts</h1>
    )
}

export default UserPosts;
