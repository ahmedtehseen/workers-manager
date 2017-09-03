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
import { addNote } from '../Dashboard.actions';

// import './AddTask.css'

const themeColor = '#7AB15A';

class AddNoteComponent extends Component {

	onFormSubmit(props){
		const { taskKey } = this.props;
		console.log('props', taskKey, this.props.user)
		const obj = { from: this.props.user.uid, note: props.note, by: this.props.user.role, taskKey }
		this.props.addNote(obj)
		this.props.reset();
		this.props.handleDialogToggle();
  }

	render() {
		const {handleSubmit} = this.props;
		return (
			<Dialog
	      title="Add Note"
	      modal={false}
	      open={this.props.isOpen}
	      onRequestClose={this.props.handleDialogToggle}
	      contentStyle={{ display: 'flex', justifyContent: 'center'}}
	      className='notes-modal'
	    >
	      <form onSubmit={handleSubmit((props) => this.onFormSubmit(props))} className='add-notes-form'>
					<Field 
						name='note' 
						multiLine={true} 
						rows={1} 
						component={TextField} 
						hintText='Write a note' 
						fullWidth={true}
						rowsMax={5}
					/>
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
						label='Add Note' 
						type='submit' 
					/>
				</form>
	    </Dialog>
		);
	}
}

const wrappedAddNote = firebaseConnect()(AddNoteComponent)

function validate(values){
	const errors = {}
	if(!values.note){
		errors.note = 'Please enter a note.'
	}
	return errors
}

const form = reduxForm({
	form: 'NoteForm',
	validate
})


const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		workers: state.dashboard.workers
	}
}

export let AddNotes = connect(
	mapStateToProps, 
	{addNote}
)(form(wrappedAddNote));


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