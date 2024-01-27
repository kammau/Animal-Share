import React from "react";

function PostCard({post}) {
    return (
        <div className="post_card">
            <h1 className="post_title">{post.title}</h1>
            <img src={post.img} alt={post.title} className="post_img"/>
            <h3 className="post_body">{post.postBody}</h3>
        </div>
    )
}

export default PostCard;