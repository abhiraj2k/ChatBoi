import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import firebase from "firebase";
import reducers from "./reducers";
import App from "./components/App";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0GMZiiM3CYrzz_tBJtcmiQIRiIHI0xSU",
  authDomain: "chatboi-766d4.firebaseapp.com",
  databaseURL: "https://chatboi-766d4.firebaseio.com",
  projectId: "chatboi-766d4",
  storageBucket: "chatboi-766d4.appspot.com",
  messagingSenderId: "171947434351",
  appId: "1:171947434351:web:4d17c83618a008ddb6c89a",
  measurementId: "G-76ZD1G3NMS",
};
firebase.initializeApp(firebaseConfig);

// Redux Dev Tools enabled
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// Setting Up redux Store
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
