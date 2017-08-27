import React, { Component } from 'react';
import { Snackbar } from 'material-ui';
import { connect } from 'react-redux'


import './App.css';

class AppComponent extends Component {
  render() {
    return (
      <div className='app-container'>
        {this.props.children}
        <Snackbar
        open={this.props.snackbar.response}
        message={this.props.snackbar.message}
        autoHideDuration={3000}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		snackbar: state.snackbar
	}
}

export const App = connect(
	mapStateToProps
)(AppComponent)
