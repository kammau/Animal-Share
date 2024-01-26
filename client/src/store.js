import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./components/reducers/viewSlice";
import sessionReducer from "./components/reducers/sessionSlice";
import sendToReducer from "./components/reducers/sendToSlice";

const store = configureStore({
    reducer: {
        view: viewReducer,
        session: sessionReducer,
        sendTo: sendToReducer
    }
})

export default store;

