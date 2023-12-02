import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import debounce from "debounce";
import { saveState } from "./store/localStorage.ts";

// saves redux state to localStorage
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
