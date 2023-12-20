import { LOGIN } from "./userTypes"

const initialState = {
    loggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: return {
            ...state,
            loggedIn: true
        }
        default: return state
    }
}

export default userReducer