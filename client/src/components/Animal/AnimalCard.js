import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSendTo } from "../reducers/sendToSlice";
import SpecificMessage from "../Message/SpecificMessage";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function AnimalCard({animal, tagAnimal}) {
    const [messageView, setMessageView] = useState(false)

    const dispatch = useDispatch();

    function handleSendTo(to) {
        dispatch(setSendTo(to))
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
                    <button onClick={() => setMessageView(false)}>Cancel</button>
                    <SpecificMessage />
                </div>
            ) : null}

            <button onClick={() => tagAnimal(animal)} className="tag_icon_btn"><img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/></button>
            <NavLink to={`/animals/${animal.id}`} data-item="AnimalPage">. . .</NavLink>
        </div>
    )
}

export default AnimalCard;
