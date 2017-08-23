import React, { Component } from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { userLogout } from './Dashboard.actions';

const themeColor = '#7AB15A';

export class DashboardContainer extends Component {
	handleLogout() {
		this.props.firebase.logout()
		.then(() => this.props.userLogout())
	}
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<RaisedButton 
					buttonStyle={{ 
						borderRadius: '2em',
						width: '150px'
					}}
					style={{ 
						borderRadius: '2em',
						width: '150px'
					}}
					labelColor='#fff'
					backgroundColor={themeColor}
					label='Logout' 
					type='submit'
					onClick={() => this.handleLogout()}
				/>
			</div>
		);
	}
}

const wrappedDashboard = firebaseConnect()(DashboardContainer)

const mapStateToProps = (state) => {
	return {
		
	}
}

export let Dashboard = connect(
	null,
	{userLogout}
)(wrappedDashboard);

