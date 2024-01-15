import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        logIn: (state) => {
            state.status = true
        },
        logOut: (state) => {
            state.status = false
        }
    }
})

export const { logIn, logOut } = sessionSlice.actions;
export default sessionSlice.reducer;