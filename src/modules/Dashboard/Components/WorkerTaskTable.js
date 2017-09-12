import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { firebaseConnect, populate, isLoaded, isEmpty } from 'react-redux-firebase';
import moment from 'moment';
import {
	Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  Checkbox
} from 'material-ui';
import Alarm from 'material-ui/svg-icons/action/alarm';
import Layers from 'material-ui/svg-icons/maps/layers';
import countdown from 'moment-countdown';
import { deleteTask } from '../Dashboard.actions';

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
				        <TableRowColumn className='table-title'><Link to={`/task/${key}`}>{this.props.tasks[key].taskTitle}</Link></TableRowColumn>
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
		tasks: populate(state.firebase, 'all-tasks'),
		user: state.auth.user
	}
}

export let WorkerTaskTable = connect(
	mapStateToProps,
	{deleteTask}
)(wrappedWorkerTaskTable);