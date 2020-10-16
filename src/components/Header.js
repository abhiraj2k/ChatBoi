import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";
import "./header.css";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logout(auth.uid));
  };
  const handleResponsive = () => {
    document.querySelector(".header-container").classList.toggle("responsive");
  };
  return (
    <div className="header-container">
      <div className="logo">ChatBoi</div>
      {!auth.authenticated ? null : (
        <div className="name">Hi, {auth.firstName}</div>
      )}

      {!auth.authenticated ? (
        <div className="login-signup">
          <Link to="/login">
            <span>Log In</span>
          </Link>
          <Link to="/signup">
            <span>Sign Up</span>
          </Link>
        </div>
      ) : null}
      {!auth.authenticated ? null : (
        <div className="logout" onClick={logOutHandler}>
          Log Out
        </div>
      )}
      <i className="fa fa-bars fa-2x " onClick={handleResponsive}></i>
    </div>
  );
};

export default Header;
