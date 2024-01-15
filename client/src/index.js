import App from "./components/App";
import "./index.css";
import store from "./store"
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
