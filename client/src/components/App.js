import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

import Login from "./Login";

function App() {
    return (
        <Provider store={store}>
            <div>
                <Login />
            </div>
        </Provider>
    )
}

export default App;
