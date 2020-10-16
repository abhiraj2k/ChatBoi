import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { HomeAccess } from "./HomeAccess";
import Login from "./Login";
import Signup from "./Signup";
import { isLoggedIn } from "../actions";

const App = () => {
  // States
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {/* Accessing Home component after login */}
        <HomeAccess path="/" exact={true} component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App;
