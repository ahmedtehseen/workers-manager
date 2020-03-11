import React, { Component } from "react";
import { Snackbar } from "material-ui";
import { connect } from "react-redux";
// styles
import "./App.css";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

class AppComponent extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="app-container">
        {this.props.isLoggedIn !== true && <Login history={history} />}
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

export const App = connect(mapStateToProps, {})(AppComponent);
