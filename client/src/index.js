import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
)
