import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function AnimalCard({animal, tagAnimal}) {
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
                <p>Current Owner: {animal.currentOwner}</p>
                {console.log(animal)}
            </div>
            <NavLink to="/messages" data-item="Messages" exact>
                <button className="message_btn">
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-message-2367724-1976874.png" alt="message icon" className="message_icon"/>
                </button>
            </NavLink>
            <button onClick={() => tagAnimal(animal.id)} className="tag_icon_btn"><img className="tag_icon" src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png" alt="tag icon"/></button>
        </div>
    )
}

export default AnimalCard;
