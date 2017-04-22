import React, { Component } from 'react';
import { Link } from 'react-router';

export class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Link to="counter">
					Counter
				</Link>
			</div>
		);
	}
}