import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = true
        }
    }
})

export const { logIn } = sessionSlice.actions;
export default sessionSlice.reducer;