import React, { Component } from "react";
import { Snackbar } from "material-ui";
import { connect } from "react-redux";
import "./App.css";
import { Login } from "./../Login/Login";

class AppComponent extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="app-container">
        {this.props.isLoggedIn !== true ? (
          <Login history={history} />
        ) : (
          this.props.history.push("/dashboard")
        )}
        <Snackbar
          open={this.props.snackbar.response}
          message={this.props.snackbar.message}
          autoHideDuration={3000}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    snackbar: state.app,
    isLoggedIn: state.auth.isLoggedIn
  };
};

export const App = connect(mapStateToProps, {}, null, { forwardRef: true })(
  AppComponent
);
