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
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Layers from 'material-ui/svg-icons/maps/layers';
// styles
import styles from './Dashboard.styles';

class DashboardLayoutComponent extends Component {
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
				    />
					</div>
					<div style={styles.tableBodyContainer}>
						<Table >
					    <TableHeader displaySelectAll={false}>
					      <TableRow>
					        <TableHeaderColumn></TableHeaderColumn>
					        <TableHeaderColumn>Name</TableHeaderColumn>
					        <TableHeaderColumn>Status</TableHeaderColumn>
					      </TableRow>
					    </TableHeader>
					    <TableBody displayRowCheckbox={false}>
					      <TableRow>
					        <TableRowColumn>1</TableRowColumn>
					        <TableRowColumn>John Smith</TableRowColumn>
					        <TableRowColumn>Employed</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>2</TableRowColumn>
					        <TableRowColumn>Randal White</TableRowColumn>
					        <TableRowColumn>Unemployed</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>3</TableRowColumn>
					        <TableRowColumn>Stephanie Sanders</TableRowColumn>
					        <TableRowColumn>Employed</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>4</TableRowColumn>
					        <TableRowColumn>Steve Brown</TableRowColumn>
					        <TableRowColumn>Employed</TableRowColumn>
					      </TableRow>
					      <TableRow>
					        <TableRowColumn>5</TableRowColumn>
					        <TableRowColumn>Christopher Nolan</TableRowColumn>
					        <TableRowColumn>Unemployed</TableRowColumn>
					      </TableRow>
					    </TableBody>
					  </Table>
					</div>
				</div>
			</div>
		);
	};
};

export let DashboardLayout = DashboardLayoutComponent;