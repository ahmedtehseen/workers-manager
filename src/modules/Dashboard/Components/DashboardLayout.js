import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import {
	Card, 
	CardText,
  RaisedButton,
} from 'material-ui';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Alarm from 'material-ui/svg-icons/action/alarm';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Layers from 'material-ui/svg-icons/maps/layers';
import Menu from 'material-ui/svg-icons/navigation/menu';
// styles
import styles from '../Dashboard.styles';
import '../Dashboard.css'

class DashboardLayoutComponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	openDialog: false
    };
  }

  handleDialogToggle() {
    this.setState({openDialog: !this.state.openDialog});
  }

	render() {
		const { user } = this.props;
		return (
			<div style={styles.taskContainer}>
				<div style={styles.statusContainer}>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<Layers style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>38</div>
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
								<div style={styles.heading}>38</div>
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
								<div style={styles.heading}>38</div>
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
								<div style={styles.heading}>38</div>
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

const wrappedDashboardLayout = firebaseConnect()(DashboardLayoutComponent);

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	}
}

export let DashboardLayout = connect(
	mapStateToProps,
	{}
)(wrappedDashboardLayout);