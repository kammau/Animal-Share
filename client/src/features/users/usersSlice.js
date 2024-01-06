import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "1",
    username: "brittany01",
    isLoggedIn: false
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        login(state, action) {
            const { id, username, isLoggedIn } = action.payload
            const 
        }
    }
})