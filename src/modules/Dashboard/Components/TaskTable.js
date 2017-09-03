import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { RaisedButton } from 'material-ui';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { AddTask } from '../../AddTask';
import { ManagerTaskTable } from './ManagerTaskTable';
import { WorkerTaskTable } from './WorkerTaskTable';
// styles
import styles from '../Dashboard.styles';
import '../Dashboard.css'

class TaskTableComponent extends Component {

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
			<div>
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
				<AddTask openDialog={this.state.openDialog} handleDialogToggle={() => this.handleDialogToggle()}/>
			</div>	
		);
	};
};

const wrappedTaskTable = firebaseConnect()(TaskTableComponent);

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	}
}

export let TaskTable = connect(
	mapStateToProps,
	{}
)(wrappedTaskTable);