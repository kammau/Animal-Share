import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ""
};

export const viewSlice = createSlice({
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

export const { viewLogin, viewSignup } = viewSlice.actions;
export default viewSlice.reducer;