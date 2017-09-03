import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { 
	Paper,
	Divider,
	TextField,
	RaisedButton
} from 'material-ui';

import { loginSuccess, loginFail } from './Login.actions';
// css
import './Login.css'

const themeColor = '#7AB15A';

const renderField = ({input, label, type, meta: {touched, error, invalid}}) => {
	return (
		<TextField
      floatingLabelText={label}
      errorText={touched ? error : ''}
      type={type}
      underlineFocusStyle={{ borderColor: themeColor }}
      floatingLabelStyle={{ color: themeColor }}
      {...input}
    />
	);
};


class LoginContainer extends Component{
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	onFormSubmit(props){
		// this.props.loginUser(props);
		this.props.firebase.login(props)
			.then(res => {
				return (
					this.props.loginSuccess(res),
					this.context.router.push('/')
				)
			})
			.catch(err => this.props.loginFail(err))
  }


	render(){
		const {handleSubmit} = this.props
		return(
			<div className='login-container'>
				<Paper className='login-paper' zDepth={2}>
					<h2 className='text-center'>Login Form</h2>
					<Divider/>
					<form onSubmit={handleSubmit((props) => this.onFormSubmit(props))} className='login-form'>
						<Field 
							name='email' 
							component={renderField} 
							label='Email' 
							type='email' 
						/>
						<Field 
							name='password' 
							component={renderField} 
							label='Password' 
							type='password' 
						/>
						<RaisedButton 
							buttonStyle={{ 
								borderRadius: '2em',
								width: '150px'
							}}
							style={{ 
								borderRadius: '2em',
								width: '150px'
							}}
							labelColor='#fff'
							backgroundColor={themeColor}
							label='Login' 
							type='submit' 
						/>
						<br/>
					</form>
				</Paper>
			</div>
		)
	}
}

const wrappedLogin = firebaseConnect()(LoginContainer)

// form validation
function validate(values){
	const errors = {}
	if(!values.email){
		errors.email = 'Email is required.'
	}
	if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(values.email)){
		errors.email = 'Invalid email address.'
	}
	if(!values.password){
		errors.password = 'Password is required.'
	}
	return errors
}

const form = reduxForm({
	form: 'LoginForm',
	validate
})

LoginContainer.contextTypes = {
	router: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => {
	return {
		
	}
}

export let Login = connect(
	mapStateToProps,
	{loginSuccess, loginFail}
)(form(wrappedLogin))