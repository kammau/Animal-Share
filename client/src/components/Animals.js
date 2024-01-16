import React, { useEffect } from "react";

function Animals() {

    useEffect(() => {
        fetch("/animals")
        .then((res) => res.json())
        .then((res) => console.log(res))
    }, [])
    
    return (
        <h1>Animals!</h1>
    )
}

export default Animals;