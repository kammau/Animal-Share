import React from "react";

function NewPostForm({setAddBtn}) {
    return (
        <>
            <button onClick={() => setAddBtn(false)}>-</button>
            <div>
                <h1>ADD A POST</h1>
                <br />

                <form>
                    
                </form>
            </div>
        </>
    )
}

export default NewPostForm;