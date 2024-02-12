import React, { useState } from "react";
import SpecificMessage from "../Message/SpecificMessage";
import { useDispatch } from "react-redux";
import { setSendTo } from "../reducers/sendToSlice";

function TaggedAnimalCard({animal, setTaggedAnimals}) {
    const [messageView, setMessageView] = useState(false)

    const dispatch = useDispatch();

    function handleSendTo(to) {
        dispatch(setSendTo(to))
    }

    function remove_tag(animal) {
        fetch(`/tagged_animals/${animal.id}`, {
            method: "DELETE",
        })
        .then((res) => res.json)
        .then(() => {
            fetch("/tagged_animals")
            .then((res) => {
                if (res.status === 200) {
                    return res.json().then((res) => setTaggedAnimals(res))
                }
                else {
                    return setTaggedAnimals()
                }
            })
        })


    }

    return (
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
            <button className="remove_btn" onClick={() => remove_tag(animal)}>X</button>
        </div>
    )
}

export default TaggedAnimalCard;