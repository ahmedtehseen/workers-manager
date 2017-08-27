import React, { Component } from 'react';
import { AppBar, IconButton, FlatButton, DropDownMenu, MenuItem, Avatar } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import CommunicationMessage from 'material-ui/svg-icons/communication/email';
import Notification from 'material-ui/svg-icons/social/notifications';
import Forum from 'material-ui/svg-icons/communication/forum';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
// styles
import styles from './Navbar.styles';

const themeColor = '#7AB15A';

const IconLeft = (props) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<IconButton>
	      <NoteAdd style={{}} color={'#E0E0E0'} hoverColor={'#BDBDBD'}/>
			</IconButton>
	    <IconButton>
	      <Forum style={{}} color={'#E0E0E0'} hoverColor={'#BDBDBD'}/>
	    </IconButton>
			<IconButton>
	      <CommunicationMessage style={{}} color={'#E0E0E0'} hoverColor={'#BDBDBD'}/>
	    </IconButton>
	    <IconButton>
	      <Notification style={{}} color={'#E0E0E0'} hoverColor={'#BDBDBD'}/>
	    </IconButton>
			<div style={styles.divider}/>
			<Avatar
        src={`${process.env.PUBLIC_URL}/avatar.png`}
        size={30}
        style={styles.avatar}
      />
			<DropDownMenu
	      value={props.value}
	      onChange={props.handleChange}
	      underlineStyle={{display: 'none' }}
	      menuItemStyle={{ color: themeColor }}
	      selectedMenuItemStyle={{ color: '#BDBDBD' }}
	      labelStyle={{ color: themeColor }}
	      iconButton={<ExpandMore/>}
	      iconStyle={{ fill: themeColor }}
	    >
	      <MenuItem value={1} primaryText="Manager" />
	      <MenuItem value={2} primaryText="Logout" onClick={props.logout}/>
	      {/*
	      <MenuItem value={3} primaryText="Weeknights" />
	      <MenuItem value={4} primaryText="Weekends" />
	      <MenuItem value={5} primaryText="Weekly" />*/}
	    </DropDownMenu>
			<div style={styles.divider}/>
			<div style={{ width: '4em' }}></div>
			<div style={styles.divider}/>
			<div style={{ width: '4em' }}></div>
		</div>
	)
}

class NavbarComponent extends Component {
	constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});
	render() {
		return (
			<AppBar
				style={styles.navbar}
		    iconElementLeft={<div></div>}
		    iconElementRight={<IconLeft handleChange={this.handleChange} value={this.state.value} logout={this.props.logout}/>}
		  />
		);
	};
};

export let Navbar = NavbarComponent;