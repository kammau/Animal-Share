import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSendTo } from "../reducers/sendToSlice";
import SpecificMessage from "../Message/SpecificMessage";

function AnimalById() {
    const [animal, setAnimal] = useState()
    const [animalPhoto, setAnimalPhoto] = useState(1)
    const [messageView, setMessageView] = useState(false)

    const dispatch = useDispatch();

    function handleSendTo(to) {
        dispatch(setSendTo(to))
    }

    function tagAnimal(animal) {
        fetch(`/animals/${animal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
    }

    function imageSrc(post, animalPhoto) {
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

    function animalPhotoNum(post, animalPhoto) {
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

    useEffect(() => {
        fetch(`${window.location.pathname}`)
        .then((res) => res.json())
        .then((res) => setAnimal(res))
    }, [])

    if (!animal) return <h1>Loading...</h1>

    return (
        <div>
            <div className="animal_cards_container">
                    <div className="animal_card" key={animal.id}>
                        <div className="animal_img_container">
                            <img src={animal.img} alt={`${animal.name}`} className="animal_img"/>
                        </div>
                        <div className="animal_text_container">
                            <h3 className="animal_name">{animal.name}</h3>
                            <p>Species: {animal.species}</p>
                            <p>Breed: {animal.breed}</p>
                            <p>Sex: {animal.sex}</p>
                            <p>Age: {animal.age}</p>
                            <p>Location: {animal.location}</p>
                            <p>Current Owner: {animal.currentOwner.username}</p>
                        </div>
                        <button className="message_btn" onClick={() => setMessageView(true)}>
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
                        </button>
                        {messageView ? (
                            <div>
                                {handleSendTo(animal.currentOwner.username)}
                                <SpecificMessage />
                                <button onClick={() => setMessageView(false)} className="animal_msg_btns">Cancel</button>
                            </div>
                        ) : null}

                        <button onClick={() => tagAnimal(animal)} className="tag_icon_btn"><img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/></button>
                    </div>
                    <div className="animal_bio">
                        <h1 className="bio_title">{animal.name}'s Bio</h1>
                        <p>{animal.bio}</p>
                    </div>
                    <div>
                        <h1 className="page_headers">{animal.name}'s Posts</h1>
                        {animal.posts ? animal.posts.map((post) => {
                            return (
                                <div className="post_card">
                                    <div className="post_img_container">
                                        <img src={imageSrc(post, animalPhoto)} alt={post["title"]} className="post_img"/>
                                        <button onClick={() => animalPhotoNum(post, animalPhoto)} className="img_scroll_btns"><img src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="logout icon" className="tag_icon"/></button>
                                    </div>
                                    <h1 className="post_title">{post.title}</h1>
                                    <h3 className="post_body">{post.postBody}</h3>
                                    <br />
                                </div>
                            )
                        }) : <h3>Looks like this animal does not have any posts!</h3>}
                    </div>
            </div>
        </div>
    )
}

export default AnimalById;