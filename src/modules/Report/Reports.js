import React, { Component } from 'react';

class ReportsComponent extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	};
};


export let Reports = ReportsComponent