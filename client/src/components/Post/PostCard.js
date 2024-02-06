import React, { useState } from "react";

function PostCard({post, tagAnimal}) {
    const [animalPhoto, setAnimalPhoto] = useState(1)

    function imageSrc(animalPhoto) {
        if (animalPhoto === 1) {
            return post.imgOne
        } 
        else if (animalPhoto === 2) {
            return post.imgTwo
        }
        else {
            return post.imgThree
        }
    }

    function animalPhotoNum(animalPhoto) {
        if (animalPhoto === 1) {
            setAnimalPhoto(2)
        }
        else if (animalPhoto === 2) {
            setAnimalPhoto(3)
        }
        else {
            setAnimalPhoto(1)
        }
    }

    return (
        <div className="post_card">
            <div className="post_img_container">
                <img src={imageSrc(animalPhoto)} alt={post.title} className="post_img"/>
                <button onClick={() => animalPhotoNum(animalPhoto)}><img src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="logout icon"/></button>
            </div>
            <h1 className="post_title">{post.title}</h1>
            <h3 className="post_body">{post.postBody}</h3>
            <br />
            {post.animals ? post.animals.map((animal) => {
                    return (
                        <div className="animal_in_post">
                            <h1>{animal.name}</h1>
                            <p>Species: {animal.species}</p>
                            <p>Breed: {animal.breed}</p>
                            <p>Age: {animal.age}</p>
                            <button onClick={() => tagAnimal(animal.id)} className="animal_post_tag">
                                <img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/>
                            </button>
                        </div>
                    )
            }) : null}
            <button className="message_btn">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
            </button>
        </div>
    )
}

export default PostCard;