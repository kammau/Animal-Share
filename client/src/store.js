import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./components/reducers/viewSlice";
import sessionReducer from "./components/reducers/sessionSlice"

const store = configureStore({
    reducer: {
        view: viewReducer,
        session: sessionReducer,
    }
})

export default store;

