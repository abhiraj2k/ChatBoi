import React, { Component } from "react";
import { connect } from "react-redux";
import "./signup.css";
import { signup } from "../actions";
import { Redirect } from "react-router-dom";

export class Signup extends Component {
  state = { firstName: "", lastName: "", email: "", password: "" };

  // Setting values to state
  firstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };
  lastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };
  emailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  passwordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  // Handle Form Submit
  onFormSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signup(user);
    this.clearFields();
  };
  // Clear Fields
  clearFields = () => {
    this.setState({ email: "", password: "", firstName: "", lastName: "" });
  };
  render() {
    if (this.props.auth.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-container">
        <div className="form-box">
          <span>Sign Up</span>
          <form onSubmit={this.onFormSubmit}>
            <label> First Name: </label>
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.firstNameChange}
            />

            <label> Last Name: </label>
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.lastNameChange}
            />

            <label> Email: </label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailChange}
            />

            <label> Password: </label>
            <input value={this.state.password} onChange={this.passwordChange} />

            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signup })(Signup);
