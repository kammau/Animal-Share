import React from "react";

function SearchAnimals({searchValue, onSearchChange}) {
    function handleSearch(event) {
        onSearchChange(event.target.value)
    }

    return (
        <div>
            <input name="search_animals" value={searchValue} onChange={handleSearch} />
        </div>
    )
}

export default SearchAnimals;