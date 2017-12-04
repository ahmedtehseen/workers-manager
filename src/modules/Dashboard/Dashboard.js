import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';

import { Navbar, SideMenu, Footer } from '../Common';
import { DashboardLayout } from './Components/DashboardLayout';
import { userLogout, getAllWorkers } from './Dashboard.actions';
// styles
import './Dashboard.css';


export class DashboardContainer extends Component {	
  componentDidMount(){
  	this.props.getAllWorkers();
  }
	handleLogout() {
		this.props.firebase.logout()
		.then(() => this.props.userLogout())
	}
	render() {
		return (
			<div>
				<Navbar logout={() => this.handleLogout()} userRole={this.props.user !== null ? this.props.user.role : null}/>
				<SideMenu userRole={this.props.user !== null ? this.props.user.role : null}/>
				<div style={{ display: 'flex', flex: '1' }}>
					<DashboardLayout children={this.props.children}/>
				</div>
				<Footer/>
				<button><Link to='task'>adasdlkasd</Link></button>
			</div>
		);
	}
}

const wrappedDashboard = firebaseConnect([
	'all-tasks'
])(DashboardContainer)

const mapStateToProps = (state) => {
	return {
		tasks: populate(state.firebase, 'all-tasks'),
		user: state.auth.user
	}
}

export let Dashboard = connect(
	mapStateToProps,
	{userLogout, getAllWorkers}
)(wrappedDashboard);

