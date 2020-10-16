import React, { Component } from "react";
import { login } from "../actions";
import { connect } from "react-redux";
import "./login.css";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  state = { email: "", password: "" };
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  // Handle Form Submit
  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.email === "") {
      alert("Email is Required");
      return;
    }
    if (this.state.password === "") {
      alert("Password is Required");
      return;
    }
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
    this.clearFields();
  };

  // Clear Fields
  clearFields = () => {
    this.setState({ email: "", password: "" });
  };

  render() {
    if (this.props.auth.authenticated) {
      return <Redirect to={"/"} />;
    }
    return (
      <div className="login-container">
        <div className="form-box">
          <span>Log In</span>
          <form onSubmit={this.onFormSubmit}>
            <label> Email: </label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailChange}
            />

            <label> Password: </label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
            />

            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps, { login })(Login);
