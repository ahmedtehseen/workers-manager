import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
	      				<Link to={`/chat/${key}`} key={key}>
		      				<ListItem
		      					key={key}
						        primaryText={this.props.workers[key].name}
						        leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/avatar.png'} />}
						      />
					      </Link>
	      			)) 
	      		: Object.keys(this.props.workers).filter(key => (
								this.props.workers[key].role === 'admin'
	      			)).map(key => (
	      				<Link to={`/chat/${key}`} key={key}>
		      				<ListItem
		      					key={key}
						        primaryText={this.props.workers[key].name}
						        leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/avatar.png'} />}
						      />
					      </Link>
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