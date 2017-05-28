import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { increment, decrement } from './counter.actions'

class CounterContainer extends Component {
	render() {
		return (
			<div>
				<RaisedButton label="+" onClick={this.props.increment} primary={true}/>
				{this.props.counter}
				<RaisedButton label="-" onClick={this.props.decrement} primary={true}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ increment, decrement }, dispatch)
}

export let Counter = connect(
	mapStateToProps, 
	mapDispatchToProps
	)(CounterContainer)