import React, { Component } from 'react';
import { Drawer, AppBar, IconButton, MenuItem } from 'material-ui';
import Menu from 'material-ui/svg-icons/navigation/menu';
// styles
import styles from './SideMenu.styles';

class SideMenuComponent extends Component {
	render() {
    const {userRole} = this.props;
		return (
			<Drawer width={200} open={true} containerStyle={styles.sidemenu}>
        <AppBar 
        	iconElementLeft={<img src={`${process.env.PUBLIC_URL}/headerLogo.jpg`} alt='logo' style={styles.logo}/>}
        	iconElementRight={<IconButton><Menu style={{}} color={'#fff'} hoverColor={'#E0E0E0'}/></IconButton>}
        	style={styles.navbar}
        />
        <MenuItem 
          onClick={() => {}} 
          style={{ 
            color: '#fff', 
            fontSize: '14px', 
            marginTop: '2em' 
          }}>
          {userRole !== null && userRole === 'admin' ? 'Manager Dashboard' : 'Worker Dashboard'}
        </MenuItem>
        <MenuItem 
          onClick={() => {}} 
          style={{ 
            color: '#fff', 
            fontSize: '14px' 
          }}>
          Total Tasks
        </MenuItem>
        {
          userRole !== null && userRole === 'admin' ?
          <MenuItem 
            onClick={() => {}} 
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            Assign a Task
          </MenuItem>
          : ''
        }
        <MenuItem 
          onClick={() => {}} 
          style={{ 
            color: '#fff', 
            fontSize: '14px' 
          }}>
          Completed Tasks
        </MenuItem>
        {
          userRole !== null && userRole === 'admin' ?
          <MenuItem 
            onClick={() => {}} 
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            Workers
          </MenuItem> :
          <MenuItem 
            onClick={() => {}} 
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            Contact Manager
          </MenuItem> 
        }
        {
          userRole !== null && userRole === 'worker' ?
          <MenuItem 
            onClick={() => {}} 
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            Help
          </MenuItem>
          : ''
        }
      </Drawer>
		)
	}
}

export let SideMenu = SideMenuComponent;