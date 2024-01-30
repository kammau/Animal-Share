import React from "react";

function SearchAnimals({searchValue, onSearchChange, setSearchBy}) {
    function handleSearch(event) {
        onSearchChange(event.target.value)
    }

    return (
        <div className="search_bar_container">
            <select placeholder="Search By" onChange={(e) => setSearchBy(e.target.value)} id="search_by">
                <option disabled>Search By</option>

                <option value="Breed">Breed</option>
                <option value="Age">Age</option>
                <option value="Species">Species</option>
                <option value="Sex">Sex</option>
            </select>
            <input id="search_bar" name="search_animals" value={searchValue} onChange={handleSearch} placeholder="Search..."/>
        </div>
    )
}

export default SearchAnimals;