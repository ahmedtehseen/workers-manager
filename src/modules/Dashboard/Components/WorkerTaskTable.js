import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { store } from '../../../store';
import moment from 'moment';
import {
	Card, 
	CardText,
	Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Checkbox
} from 'material-ui';
import Alarm from 'material-ui/svg-icons/action/alarm';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Layers from 'material-ui/svg-icons/maps/layers';
import countdown from 'moment-countdown';
// actions 
import { deleteTask } from '../Dashboard.actions';
import '../Dashboard.css'

class WorkerTaskTableComponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	openDialog: false
    };
  }

  deleteTask(key) {
  	this.props.deleteTask(key)
  }

	render() {
		const renderTasks = !isLoaded(this.props.tasks)
	    ? <TableRow><TableRowColumn>Loading...</TableRowColumn></TableRow>
	    : isEmpty(this.props.tasks)
	      ? <TableRow><TableRowColumn>No Task Assigned yet.</TableRowColumn></TableRow>
	      : Object.keys(this.props.tasks).map(
	        	(key, id) => (
	            <TableRow key={key}>
				        <TableRowColumn className='table-index'>{id+1}</TableRowColumn>
				        <TableRowColumn className='table-title'>{this.props.tasks[key].taskTitle}</TableRowColumn>
				        <TableRowColumn className='table-time'>
				        	{moment(this.props.tasks[key].completionDate).countdown().toString()}
				        </TableRowColumn>
				        <TableRowColumn className='table-select'>
				        	<Checkbox className='table-checkbox' checked={true} iconStyle={{ fill: '#7AB15A' }}/>
				        </TableRowColumn>
				      </TableRow>
	          )
	        )
		return (
			<Table className='task-table' >
		    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
		      <TableRow className='table-header-row'>
		        <TableHeaderColumn className='table-index-th'></TableHeaderColumn>
		        <TableHeaderColumn className='table-title-th'>
		        	<div className='align-header'>
		        		<Layers style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>
		        		<span>Current Tasks</span>
		        	</div>
		        </TableHeaderColumn>
		        <TableHeaderColumn className='table-time-th'>
		        	<div className='align-header'>
			        	<Alarm style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>
			        	<span>Time Left</span>
		        	</div>
		        </TableHeaderColumn>
		        <TableHeaderColumn className='table-select-th'></TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody showRowHover={true} displayRowCheckbox={false}>
			    {renderTasks}  
		    </TableBody>
		  </Table>
		);
	};
};


const wrappedWorkerTaskTable = firebaseConnect(
	({user}) => {
		return ([
			`/all-tasks#orderByChild=workerId${user !== null ? '&equalTo='+user.uid : ''}`
		])
	}
)(WorkerTaskTableComponent);

const mapStateToProps = (state) => {
	return {
		tasks: dataToJS(state.firebase, 'all-tasks'),
		user: state.auth.user
	}
}

export let WorkerTaskTable = connect(
	mapStateToProps,
	{deleteTask}
)(wrappedWorkerTaskTable);