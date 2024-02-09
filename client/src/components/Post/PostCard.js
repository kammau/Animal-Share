import React, { useState } from "react";
import SpecificMessage from "../Message/SpecificMessage";
import { useDispatch } from "react-redux";
import { setSendTo } from "../reducers/sendToSlice";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function PostCard({post, tagAnimal}) {
    const [animalPhoto, setAnimalPhoto] = useState(1)
    const [messageView, setMessageView] = useState(false)

    const dispatch = useDispatch();

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
        if (animalPhoto === 1 && post.imgTwo !== null) {
            setAnimalPhoto(2)
        }
        else if (animalPhoto === 2 && post.imgThree !== null) {
            setAnimalPhoto(3)
        }
        else {
            setAnimalPhoto(1)
        }
    }

    function handleSendTo(to) {
        dispatch(setSendTo(to))
    }

    return (
        <div className="post_card">
            <div className="post_img_container">
                <img src={imageSrc(animalPhoto)} alt={post.title} className="post_img"/>
                <button onClick={() => animalPhotoNum(animalPhoto)} className="img_scroll_btns"><img src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="logout icon" className="tag_icon"/></button>
            </div>
            <h1 className="post_title">{post.title}</h1>
            <p>Posted By: {post.user.username}</p>
            <h3 className="post_body">{post.postBody}</h3>
            <br />
            {post.animals ? post.animals.map((animal) => {
                    return (
                        <div className="animal_in_post">
                            <h1>{animal.name}</h1>
                            <img src={animal.img} className="post_animal_img" alt={`${animal.name}`}/>
                            <p>Species: {animal.species}</p>
                            <p>Breed: {animal.breed}</p>
                            <p>Age: {animal.age}</p>
                            <NavLink to={`/animals/${animal.id}`}><button className="post_more">MORE</button></NavLink>
                            <button onClick={() => tagAnimal(animal.id)} className="animal_post_tag">
                                <img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/>
                            </button>
                        </div>
                    )
            }) : null}
            {messageView ? (
                <div className="specific_message">
                    {handleSendTo(post.user.username)}
                    <SpecificMessage />
                    <button onClick={() => setMessageView(false)}>Cancel</button>
                </div>
            ) : null}
            <button className="message_btn_in_post" onClick={() => setMessageView(true)}>
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
            </button>
        </div>
    )
}

export default PostCard;