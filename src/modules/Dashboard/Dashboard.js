import React, { Component } from 'react';
import { Link } from 'react-router';
import { RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { Navbar, SideMenu, Footer } from '../Common';
import { DashboardLayout } from './DashboardLayout';
import { userLogout, getAllWorkers } from './Dashboard.actions';


const themeColor = '#7AB15A';

export class DashboardContainer extends Component {
	componentWillMount() {
    this.props.getAllWorkers();
  }
	handleLogout() {
		this.props.firebase.logout()
		.then(() => this.props.userLogout())
	}
	render() {
		return (
			<div>
				<Navbar logout={() => this.handleLogout()}/>
				<SideMenu/>
				<div style={{ display: 'flex', flex: '1' }}>
					<DashboardLayout />
				</div>
				<Footer/>
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
	{userLogout, getAllWorkers}
)(wrappedDashboard);

