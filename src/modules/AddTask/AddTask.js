import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import {
	Dialog, 
	FlatButton,
	RaisedButton,
	MenuItem
} from 'material-ui';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { SelectField, TextField, DatePicker } from 'redux-form-material-ui';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';
import {  } from './AddTask.actions';

import './AddTask.css'

const themeColor = '#7AB15A';

// const renderField = ({input, label, multiLine, rows, fullWidth, type, meta: {touched, error, invalid}}) => {
// 	return (
// 		<TextField
//       hintText={label}
//       className='task-modal-text-field'
//       errorText={touched ? error : ''}
//       type={type}
//       fullWidth={ fullWidth ? fullWidth : false}
//       multiLine={multiLine ? multiLine : false}
//       hintStyle={multiLine ? { bottom: 'auto', top: '12px' } : { }}
//       rows={ rows  ? parseInt(rows) : 1}
//       underlineFocusStyle={{ borderColor: themeColor }}
//       floatingLabelStyle={{ color: themeColor }}
//       {...input}
//     />
// 	)
// }

// const renderSelectField = props => (
//   <SelectField
//     hintText="Select worker name"
//     underlineFocusStyle={{ borderColor: themeColor }}
//     errorText={props.meta.touched && props.meta.error}
//     {...props}
//     onChange={(event, index, value) => props.onChange(value)}>
//   </SelectField>
// )


class AddTaskComponent extends Component {

	onFormSubmit(props){
		// const worker = this.state.value
		const file = this.file.files[0]
		console.log('worker', props, file)
		// this.props.addUser(props);
		// this.props.reset();
		// this.props.handleDialogToggle();
  }
  // state = {
  //   name:'',
  // };

  // handleChange = (event, index, value ) => {
  // 	const name = event.target.innerHTML
  // 	return (
  // 		console.log(event.target.innerHTML, index, value ),
  // 		this.setState({name})
  // 	)
  // };

	render() {
		const {handleSubmit} = this.props;
		return (
			<Dialog
	      title="Create A New Task"
	      modal={false}
	      open={this.props.openDialog}
	      onRequestClose={this.props.handleDialogToggle}
	      contentStyle={{ display: 'flex', justifyContent: 'center'}}
	      className='task-modal'
	    >
	      <form onSubmit={handleSubmit((props) => this.onFormSubmit(props))} className='add-task-form'>
	      	<div className='top-task-fileds'>
						<Field name='taskTitle' component={TextField} hintText='Task Title' type='text' />
						&nbsp;&nbsp;&nbsp;
						<Field name="worker" component={SelectField} hintText="Select worker name">
		          <MenuItem value={{name: 'abc', uid: 'asdasdasd-asd-ad-asd-ads'}} primaryText="ABC"/>
		          <MenuItem value={{abc: 'sadasd'}} primaryText="Every Night" />
		          <MenuItem value={3} primaryText="Weeknights" />
		          <MenuItem value={4} primaryText="Weekends" />
		          <MenuItem value={5} primaryText="Weekly" />
		        </Field>
	      	</div>
	      	<br/>
	      	<div className='middle-textarea'>
						<Field name='details' multiLine={true} rows={3} component={TextField} hintText='Task Details' fullWidth={true}/>
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
				      labelPosition="before"
				      labelStyle={{ color: '#E0E0E0' }}
				    >
				      <input type="file" style={styles.uploadInput} ref={(file) => { this.file = file }}/>
				    </FlatButton>
						&nbsp;&nbsp;&nbsp;
						<Field name='dateOfCompletion' component={DatePicker} format={null} hintText='Date of Completion' />
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
						label='Add User' 
						type='submit' 
					/>
				</form>
	    </Dialog>
		);
	}
}

const wrappedAddTask = firebaseConnect()(AddTaskComponent)

function validate(values){
	const errors = {}
	console.log('validate', values)
	if(!values.taskTitle){
		errors.taskTitle = 'Title is required.'
	}

	if(!values.worker){
		errors.worker = 'Please select a Worker.'
	}
	if(!values.details){
		errors.details = 'Please provide some details.'
	}

	if(!values.dateOfCompletion){
		errors.dateOfCompletion = 'Please select completion date.'
	}

	return errors
}

const form = reduxForm({
	form: 'CreateTaskForm',
	validate
})

export let AddTask = connect(
	null, 
	{}
)(form(wrappedAddTask));


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