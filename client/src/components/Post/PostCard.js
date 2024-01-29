import React from "react";

function PostCard({post, tagAnimal}) {
    return (
        <div className="post_card">
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
                            <button onClick={() => tagAnimal(animal.id)}>
                                <img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/>
                            </button>
                        </div>
                    )
            }) : null}
            <button>
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
            </button>
        </div>
    )
}

export default PostCard;