import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import moment from 'moment';
import { RaisedButton, IconButton, Paper, List, ListItem, Subheader, Avatar } from 'material-ui';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
// import Menu from 'material-ui/svg-icons/navigation/menu';
import Alarm from 'material-ui/svg-icons/action/alarm';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';
import Note from 'material-ui/svg-icons/av/note';
import Delete from 'material-ui/svg-icons/action/delete';
import { AddNotes } from '../Dashboard/Components/AddNotes';
import { DeliverTask } from '../Dashboard/Components/DeliverTask';
// styles
import './Report.css';

const themeColor = '#7AB15A';

class ReportComponent extends Component {

	render() {
		const { user, tasks } = this.props;
		const { key } = this.props.params;
		console.log('Single Task:', tasks, key)
		return (
			<div>
				<div className='report-container'>
				  <Paper className='report-tab' zDepth={1}>
				  	<List>
				      <Subheader>All Task</Subheader>
				      {
				      	tasks !== null ? tasks !== undefined ?
			      			Object.keys(tasks).map(key => (
			      				<ListItem key={key} primaryText={tasks[key].taskTitle} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
							    ))
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      }
				    </List>
				  </Paper>
				  <Paper className='report-tab' zDepth={1}>
				  	<List>
				      <Subheader>Open Tasks</Subheader>
				      {
				      	tasks !== null ? tasks !== undefined ?
				      			Object.keys(tasks).filter(key => (
											tasks[key].status === 'pending'
				      			)).map(key => (
				      				<ListItem
				      					key={key}
								        primaryText={tasks[key].taskTitle}
								        leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />}
								      />
				      			))
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      }
				    </List>
				  </Paper>
				  <Paper className='report-tab' zDepth={1}>
				  	<List>
				      <Subheader>Completed Tasks</Subheader>
				      {
				      	tasks !== null ? tasks !== undefined ?
				      			Object.keys(tasks).filter(key => (
											tasks[key].status === 'completed'
				      			)).map(key => (
				      				<ListItem
				      					key={key}
								        primaryText={tasks[key].taskTitle}
								        leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />}
								      />
				      			))
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      	: <ListItem primaryText={'No Task Assigned yet'} leftAvatar={<Avatar src={process.env.PUBLIC_URL + '/task.png'} />} />
				      }
				    </List>
				  </Paper>
			  </div>
			</div>	
		);
	};
};

const wrappedReport = firebaseConnect(
	(props) => {
		return ([
			`/all-tasks#orderByChild=workerId${props.params !== null ? '&equalTo='+props.params.key : ''}`
		])
	}
)(ReportComponent);

const mapStateToProps = (state) => {
	return {
		tasks: populate(state.firebase, 'all-tasks'),
		user: state.auth.user
	}
}

export let Report = connect(
	mapStateToProps,
	{}
)(wrappedReport);