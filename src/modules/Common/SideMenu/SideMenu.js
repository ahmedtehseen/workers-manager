import React, { Component } from 'react';
import { Drawer, AppBar, IconButton, MenuItem } from 'material-ui';
import Menu from 'material-ui/svg-icons/navigation/menu';

import styles from './SideMenu.styles';

class SideMenuComponent extends Component {
	render() {
		return (
			<Drawer width={200} open={true} containerStyle={styles.sidemenu}>
        <AppBar 
        	iconElementLeft={<div></div>}
        	title={'Logo'}
        	iconElementRight={<IconButton><Menu style={{}} color={'#fff'} hoverColor={'#E0E0E0'}/></IconButton>}
        	style={styles.navbar}
        />
        <MenuItem onClick={() => {}} style={{ color: '#fff', fontSize: '14px', marginTop: '2em' }}>Manager Dashboard</MenuItem>
        <MenuItem onClick={() => {}} style={{ color: '#fff', fontSize: '14px' }}>Total Tasks</MenuItem>
        <MenuItem onClick={() => {}} style={{ color: '#fff', fontSize: '14px' }}>Assign a Task</MenuItem>
        <MenuItem onClick={() => {}} style={{ color: '#fff', fontSize: '14px' }}>Completed Tasks</MenuItem>
        <MenuItem onClick={() => {}} style={{ color: '#fff', fontSize: '14px' }}>Workers</MenuItem>
      </Drawer>
		)
	}
}

export let SideMenu = SideMenuComponent;