import React from "react";
import { Redirect, Route } from "react-router-dom";

// Accessing Home component
export class HomeAccess extends React.Component {
  render() {
    return (
      <div>
        <Route
          path={this.props.path}
          exact={this.props.exact}
          component={(props) => {
            const user = localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user"))
              : null;
            if (user) {
              return <this.props.component {...props} />;
            } else {
              return <Redirect to={"/login"} />;
            }
          }}
        />
      </div>
    );
  }
}

export default HomeAccess;
