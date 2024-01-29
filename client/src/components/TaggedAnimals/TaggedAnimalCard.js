import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function TaggedAnimalCard({animal, setTaggedAnimals}) {

    function remove_tag(animal) {
        fetch(`/tagged_animals/${animal.id}`, {
            method: "DELETE",
        })
        fetch("/tagged_animals")
        .then((res) => res.json())
        .then((res) => setTaggedAnimals(res))
    }

    return (
        <div className="animal_card" key={animal.id}>
            <div className="animal_img_container">
                <img src={animal.img} alt={`${animal.name}`} className="animal_img"/>
            </div>
            <div className="animal_text_container">
                <h3>Name: {animal.name}</h3>
                <p>Species: {animal.species}</p>
                <p>Breed: {animal.breed}</p>
                <p>Sex: {animal.sex}</p>
                <p>Age: {animal.age}</p>
                <p>Location: {animal.location}</p>
                <p>Current Owner: {animal.currentOwner.username}</p>
            </div>
            <NavLink to="/messages" data-item="Messages" exact>
                <button className="message_btn">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
                </button>
            </NavLink>
            <button className="remove_btn" onClick={() => remove_tag(animal)}>X</button>
        </div>
    )
}

export default TaggedAnimalCard;