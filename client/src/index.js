import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

// const container = document.getElementById("root");
// const root = createRoot(container)
// root.render(<App />)

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
)