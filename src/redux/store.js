import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({})

// Have to write the initial store & condition to store data into local storage & to not loss data.

const initialStore = {
    cartReducer : {
        cartItems : JSON.parse(localStorage.getItem("cartItems")) ?? []
    }
}

export const store = createStore(rootReducer,initialStore, composeEnhancers());