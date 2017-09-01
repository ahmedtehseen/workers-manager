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
} from 'material-ui';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Layers from 'material-ui/svg-icons/maps/layers';
import { TableMenuButton } from './TableMenuButton';
// actions 
import { deleteTask } from '../Dashboard.actions';
import '../Dashboard.css'

class ManagerTaskTableComponent extends Component {

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
				        <TableRowColumn className='table-time'>{this.props.tasks[key].assignTo}</TableRowColumn>
				        <TableRowColumn className='table-edit'>
				        	<TableMenuButton 
				        		task={this.props.tasks[key]} 
				        		deleteTask={() => this.deleteTask(key)}
				        	/>
				        </TableRowColumn>
				      </TableRow>
	          )
	        )
		return (
			<Table className='task-table' >
		    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
		      <TableRow>
		        <TableHeaderColumn className='table-index-th'></TableHeaderColumn>
		        <TableHeaderColumn className='table-title-th'>
		        	<div className='align-header'>
		        		<Layers style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>
		        		<span>Current Tasks</span>
		        	</div>
		        </TableHeaderColumn>
		        <TableHeaderColumn className='table-time-th'>
		        	<div className='align-header'>
			        	<Bookmark style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>
			        	<span>Assigned To</span>
		        	</div>
		        </TableHeaderColumn>
		        <TableHeaderColumn className='table-edit-th'>Edit</TableHeaderColumn>
		      </TableRow>
		    </TableHeader>
		    <TableBody showRowHover={true} displayRowCheckbox={false}>
			    {renderTasks}  
		    </TableBody>
		  </Table>
		);
	};
};

const wrappedManagerTaskTable = firebaseConnect([
	'/all-tasks',
])(ManagerTaskTableComponent);

const mapStateToProps = (state) => {
	return {
		tasks: dataToJS(state.firebase, 'all-tasks'),
	}
}

export let ManagerTaskTable = connect(
	mapStateToProps,
	{deleteTask}
)(wrappedManagerTaskTable);