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
        }
    }
})

export const { logIn } = sessionSlice.actions;
export default sessionSlice.reducer;