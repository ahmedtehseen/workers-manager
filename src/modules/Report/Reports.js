import React, { Component } from 'react';

export class ReportsComponent extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	};
};


export let Reports = ReportsComponent