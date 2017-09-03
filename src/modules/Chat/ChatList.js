import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { 
	List,
	ListItem,
	Subheader,
	Avatar
} from 'material-ui';

class ChatListComponent extends Component {
	render() {
		return (
			<List>
	      <Subheader>{this.props.user !== null ? this.props.user.role === 'admin' ? 'Workers List' : 'Admin List' : ''}</Subheader>
	      {
	      	this.props.workers && this.props.user !== null ?
	      		this.props.user.role === 'admin' ?
	      			Object.keys(this.props.workers).filter(key => (
								this.props.workers[key].role === 'worker'
	      			)).map(key => (
	      				<ListItem
					        primaryText={this.props.workers[key].name}
					        leftAvatar={<Avatar src="images/ok-128.jpg" />}
					      />
	      			)) 
	      		: Object.keys(this.props.workers).filter(key => (
								this.props.workers[key].role === 'admin'
	      			)).map(key => (
	      				<ListItem
					        primaryText={this.props.workers[key].name}
					        leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/avatar.png'} />}
					      />
	      			))
	      	: ''
	      }
	    </List>
		);
	};
};

const wrappedChatList = firebaseConnect()(ChatListComponent);

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		workers: state.dashboard.workers,
	}
}

export let ChatList = connect(
	mapStateToProps,
	{}
)(wrappedChatList);