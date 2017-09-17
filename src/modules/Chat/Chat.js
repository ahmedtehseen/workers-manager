import React, { Component } from 'react';
import { firebaseConnect, populate } from 'react-redux-firebase';
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

const wrappedChat = firebaseConnect([
	'all-tasks'
])(ChatComponent);

const mapStateToProps = (state) => {
	return {
		tasks: populate(state.firebase, 'all-tasks'),
	}
}

export let Chat = connect(
	mapStateToProps,
	{}
)(wrappedChat);