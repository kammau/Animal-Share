import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import viewReducer from "./components/reducers/viewSlice";

const store = configureStore({
    reducer: {
        view: viewReducer,
    }
})

export default store;

