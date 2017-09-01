import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import {
	Card, 
	CardText,
	Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
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
import { AddTask } from '../../AddTask';
import { TableMenuButton } from './TableMenuButton';
import { ManagerTaskTable } from './ManagerTaskTable';
import { WorkerTaskTable } from './WorkerTaskTable';
// actions 
import { deleteTask } from '../Dashboard.actions';
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
					<div style={styles.tableHeader}>
						<p style={styles.tableText}>Current Tasks</p>
						{ 
							user !== null ? user.role === 'admin' ?
						 	<RaisedButton
					      label="Assign a New Task"
					      labelPosition="before"
					      icon={<NoteAdd />}
					      style={{margin: '12px'}}
					      buttonStyle={{ height: '50px' }}
					      backgroundColor='rgb(228,81,81)'
					      labelStyle={{ color: '#fff' }}
					      className='task-button'
					      onClick={() => this.handleDialogToggle()}
					    /> :
						  <div className='table-sort-btn'>
						  	<div className='border'/>
						  	<span>Sort by</span>
						  	&nbsp;
						  	<Menu style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>
						  </div> : 
						''}
						
					</div>
					<div style={styles.tableBodyContainer}>
						{
							user !== null ? 
							user.role === 'admin' ?
							<ManagerTaskTable /> :
							<WorkerTaskTable /> :
							''
						}
					</div>
				</div>
				<AddTask openDialog={this.state.openDialog} handleDialogToggle={() => this.handleDialogToggle()}/>
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
	{deleteTask}
)(wrappedDashboardLayout);