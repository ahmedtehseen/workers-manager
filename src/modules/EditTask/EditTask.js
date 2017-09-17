import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import {
	Dialog, 
	FlatButton,
	RaisedButton,
	MenuItem
} from 'material-ui';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { SelectField, TextField, DatePicker } from 'redux-form-material-ui';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';
import { uploadTaskFile, editTask } from './EditTask.actions';

import './EditTask.css'

const themeColor = '#7AB15A';

class EditTaskComponent extends Component {

	onFormSubmit(props){
		const file = this.file.files[0];
		const { dateOfSubmition, details, taskTitle, worker: { name, uid }, adminId, status, timestamp, key } = props;
		const completionDate = dateOfSubmition.getTime();
		const objWithFile = { completionDate, details, taskTitle, assignTo:name , workerId: uid, file, adminId, status, timestamp, key }
		const objWithoutFile = { completionDate, details, taskTitle, assignTo:name , workerId: uid, adminId, status, timestamp, key }
		if(file) {
			this.props.uploadTaskFile(objWithFile);
		} else {
			this.props.editTask(objWithoutFile)
		}
		this.props.reset();
		this.props.closeDialog();
		this.file = null;
  }

	render() {
		const {handleSubmit} = this.props;
		return (
			<Dialog
	      title="Edit Task"
	      modal={false}
	      open={this.props.openEditDialog}
	      onRequestClose={this.props.closeDialog}
	      contentStyle={{ display: 'flex', justifyContent: 'center'}}
	      className='task-modal'
	    >
	      <form onSubmit={handleSubmit((props) => this.onFormSubmit(props))} className='add-task-form'>
	      	<div className='top-task-fileds'>
						<Field name='taskTitle' component={TextField} hintText='Task Title' type='text' />
						&nbsp;&nbsp;&nbsp;
						<Field name="worker" component={SelectField} hintText="Select worker name">
							{
								this.props.workers !== null ?
								Object.keys(this.props.workers).filter((key) => {
									return this.props.workers[key].role === 'worker'
								}).map((key) => (
										<MenuItem key={key} value={this.props.workers[key]} primaryText={this.props.workers[key].name} />
									))
								: <MenuItem value={'No user'} primaryText="Please wait..." />
							}
		        </Field>
	      	</div>
	      	<br/>
	      	<div className='middle-textarea'>
						<Field 
							name='details' 
							multiLine={true} 
							rows={3} 
							component={TextField} 
							hintText='Task Details' 
							fullWidth={true}
							rowsMax={5}
						/>
					</div>
					<br/>
					<div className='bottom-task-fields'>
						<FlatButton
				      label="Add Attachment"
				      backgroundColor={'#fff'}
				      labelPosition="before"
				      style={styles.uploadButton}
				      containerElement="label"
				      hoverColor={'#fff'}
				      icon={<AttachFile color={'#E0E0E0'}/>}
				      labelStyle={{ color: '#E0E0E0' }}
				    >
				      <input type="file" style={styles.uploadInput} ref={(file) => { this.file = file }}/>
				    </FlatButton>
						&nbsp;&nbsp;&nbsp;
						<Field name='dateOfSubmition' component={DatePicker} format={null} hintText='Date of Completion' />
					</div>
					<RaisedButton 
						buttonStyle={{ 
							borderRadius: '2em',
							width: '150px'
						}}
						style={{ 
							borderRadius: '2em',
							width: '150px',
							marginTop: '2em'
						}}
						labelColor='#fff'
						backgroundColor={themeColor}
						label='Re-Assign Task' 
						type='submit' 
					/>
				</form>
	    </Dialog>
		);
	}
}

const wrappedEditTask = firebaseConnect()(EditTaskComponent)

function validate(values){
	const errors = {}
	if(!values.taskTitle){
		errors.taskTitle = 'Title is required.'
	}

	if(!values.worker){
		errors.worker = 'Please select a Worker.'
	}
	
	if(!values.details){
		errors.details = 'Please provide some details.'
	}

	if(!values.dateOfSubmition){
		errors.dateOfSubmition = 'Please select submition date.'
	}

	return errors
}

const form = reduxForm({
	form: 'EditTaskForm',
	validate
})


const mapStateToProps = (state) => {
	return {
		user: state.firebase.auth,
		workers: state.dashboard.workers,
		initialValues: state.dashboard.currentTask
	}
}

export let EditTask = connect(
	mapStateToProps, 
	{uploadTaskFile, editTask}
)(form(wrappedEditTask));


const styles = {
  uploadButton: {
    verticalAlign: 'middle',
    width: '16em',
    marginTop: '5px',
    borderBottom: '1px solid rgb(224, 224, 224)'
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};