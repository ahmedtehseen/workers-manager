import React, { Component } from 'react';
import {
	Card, 
	CardText,
	Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton
} from 'material-ui';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Alarm from 'material-ui/svg-icons/action/alarm';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Layers from 'material-ui/svg-icons/maps/layers';

import { AddTask } from '../AddTask';
// styles
import styles from './Dashboard.styles';

class DashboardLayoutComponent extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	value: 1,
    	openDialog: false
    };
  }

  handleDialogToggle = () => {
    this.setState({openDialog: !this.state.openDialog});
  };

	render() {
		return (
			<div style={styles.taskContainer}>
				<div style={styles.statusContainer}>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<Layers style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>38</div>
								<div>Tasks</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<Alarm style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>38</div>
								<div>Tasks</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<CheckCircle style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>38</div>
								<div>Tasks</div>
							</div>
						</CardText>
					</Card>
					<Card containerStyle={styles.card}>
						<CardText style={styles.cardText}>
							<div style={styles.iconContainer}>
								<ErrorOutline style={styles.icon} color={'#7AB15A'} hoverColor={'#77B443'}/>
							</div>
							<div style={styles.text}>
								<div style={styles.heading}>38</div>
								<div>Tasks</div>
							</div>
						</CardText>
					</Card>
				</div>
				<div style={styles.tableContainer}>
					<div style={styles.tableHeader}>
						<p style={styles.tableText}>Current Tasks</p>
						<RaisedButton
				      label="Assign a New Task"
				      labelPosition="before"
				      icon={<NoteAdd />}
				      style={{margin: '12'}}
				      buttonStyle={{ height: '50px' }}
				      backgroundColor='rgb(228,81,81)'
				      labelStyle={{ color: '#fff' }}
				      className='task-button'
				      onClick={() => this.handleDialogToggle()}
				    />
					</div>
					<div style={styles.tableBodyContainer}>
						<Table >
					    <TableHeader displaySelectAll={false}>
					      <TableRow>
					        <TableHeaderColumn></TableHeaderColumn>
					        <TableHeaderColumn><Layers style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>Current Tasks</TableHeaderColumn>
					        <TableHeaderColumn><Bookmark style={{}} color={'#7AB15A'} hoverColor={'#77B443'}/>Assigned to</TableHeaderColumn>
					        <TableHeaderColumn>Edit</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody displayRowCheckbox={false}>
					      <TableRow>
					        <TableRowColumn>1</TableRowColumn>
					        <TableRowColumn>John Smith</TableRowColumn>
					        <TableRowColumn>Employed</TableRowColumn>
					        <TableRowColumn>edit</TableRowColumn>
					      </TableRow>
					    </TableBody>
					  </Table>
					</div>
				</div>
				<AddTask openDialog={this.state.openDialog} handleDialogToggle={() => this.handleDialogToggle()}/>
			</div>
		);
	};
};

export let DashboardLayout = DashboardLayoutComponent;