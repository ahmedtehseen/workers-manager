import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import {
	Card, 
	CardText,
} from 'material-ui';
import Alarm from 'material-ui/svg-icons/action/alarm';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Layers from 'material-ui/svg-icons/maps/layers';
import styles from '../Dashboard.styles';

class DashboardLayoutComponent extends Component {

	render() {
		const { user } = this.props;
		const tasksKeys = this.props.tasks !== undefined ? this.props.tasks !== null ? Object.keys(this.props.tasks) : null : null;
		return (
			<div style={styles.taskContainer}>
				<div style={styles.statusContainer}>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<Layers style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>
									{
										tasksKeys !== null ?
										tasksKeys.length
										: '0'
									}
								</div>
								<div>Tasks</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<Alarm style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>0</div>
								<div>Late</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<CheckCircle style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>
									{
										tasksKeys !== null ?
										tasksKeys.filter(key => {
											return this.props.tasks[key].status === 'completed'
										}).length
										: '0'
									}
								</div>
								<div>Completed</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<ErrorOutline style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>
									{
										tasksKeys !== null ?
										tasksKeys.filter(key => {
											return this.props.tasks[key].status === 'pending'
										}).length
										: '0'
									}
								</div>
								<div>{ user !== null ? user.role === 'admin' ? 'Pending' : 'Ongoing' : 'Ongoing'}</div>
							</div>
						</CardText>
					</Card>
				</div>
				<div style={styles.tableContainer}>
					{this.props.children}
				</div>
			</div>
		);
	};
};

const wrappedDashboardLayout = firebaseConnect([
	'all-tasks'
])(DashboardLayoutComponent);

const mapStateToProps = (state) => {
	return {
		tasks: populate(state.firebase, 'all-tasks'),
		user: state.auth.user,
	}
}

export let DashboardLayout = connect(
	mapStateToProps,
	{}
)(wrappedDashboardLayout);