import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ""
};

export const sendToSlice = createSlice({
    name: "sendTo",
    initialState,
    reducers: {
        setSendTo: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setSendTo } = sendToSlice.actions;
export default sendToSlice.reducer;