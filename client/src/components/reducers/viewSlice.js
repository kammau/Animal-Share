import { createSlice } from "@reduxjs/toolkit";

// const viewReducer = (state = "login", action) => {
//     switch(action.type) {
//         case "LOGIN":
//             return state = "login"
//         case "SIGNUP":
//             return state = "signup"
//         default:
//             return state;
//     }
// }

const initialState = { value: "" }

const viewSlice = createSlice({
    name: "view",
    initialState,
    reducers: {
        viewLogin: (state) => {
            state.value = "login"
        },
        viewSignup: (state) => {
            state.value = "signup"
        }
    }
})

export const { viewLogin, viewSignup } = viewSlice.actions
export default viewSlice.reducer