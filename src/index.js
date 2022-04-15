import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import { Reducer1 } from "./store/reducer/reducer1";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
//using combine reducer method to combines multiple reducer files
const reducer = combineReducers({ rd1: Reducer1 });
//creating store and  uses thunk as middleware
const store = createStore(reducer, applyMiddleware(thunk));
//root is the entry point of the application
root.render(
  <StrictMode>
    {/* this is context provider where , store will available to the entire application */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
