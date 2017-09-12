import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
// styles
import './Chat.css';

class ChatComponent extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	};
};

const wrappedChat = firebaseConnect()(ChatComponent);

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		workers: state.dashboard.workers,
	}
}

export let Chat = connect(
	mapStateToProps,
	{}
)(wrappedChat);