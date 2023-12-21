import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./users/userReducer"

const store = createStore(userReducer)

export default store
