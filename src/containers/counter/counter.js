import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { increment, decrement } from './counter.actions';

class CounterContainer extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.increment}>+</button>
				<p>{this.props.counter}</p>
				<button onClick={this.props.decrement}>-</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ increment, decrement }, dispatch);
}

export let Counter = connect(
	mapStateToProps, 
	mapDispatchToProps
	)(CounterContainer);