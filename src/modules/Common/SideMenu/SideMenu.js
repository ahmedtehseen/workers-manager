import React, { Component } from 'react';
import { Link } from 'react-router';
import { Drawer, AppBar, IconButton, MenuItem } from 'material-ui';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { AddTask } from '../../AddTask';
// styles
import styles from './SideMenu.styles';

class SideMenuComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }

  handleDialogToggle() {
    this.setState({openDialog: !this.state.openDialog});
  }

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
          className='sidemenu-menuitem'
          style={{ 
            color: '#fff', 
            fontSize: '14px', 
            marginTop: '2em' 
          }}>
          <Link to='/dashboard'>{userRole !== null && userRole === 'admin' ? 'Manager Dashboard' : 'Worker Dashboard'}</Link>
        </MenuItem>
        <MenuItem 
          className='sidemenu-menuitem'
          style={{ 
            color: '#fff', 
            fontSize: '14px' 
          }}>
          <Link to='/total-tasks'>Total Tasks</Link>
        </MenuItem>
        {
          userRole !== null && userRole === 'admin' ?
          <MenuItem 
            onClick={() => this.handleDialogToggle()}
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            Assign a Task
          </MenuItem>
          : ''
        }
        <MenuItem 
          className='sidemenu-menuitem' 
          style={{ 
            color: '#fff', 
            fontSize: '14px' 
          }}>
          <Link to='/completed-tasks'>Completed Tasks</Link>
        </MenuItem>
        {
          userRole !== null && userRole === 'admin' ?
          <MenuItem 
            className='sidemenu-menuitem'
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            <Link to='/chat'>Workers</Link>
          </MenuItem> :
          <MenuItem 
            className='sidemenu-menuitem'
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            <Link to='/chat'>Contact Manager</Link>
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
        {
          userRole !== null && userRole === 'admin' ?
          <MenuItem 
            className='sidemenu-menuitem'
            style={{ 
              color: '#fff', 
              fontSize: '14px' 
            }}>
            <Link to='/reports'>Reports</Link>
          </MenuItem> 
          : ''
        }
        <AddTask openDialog={this.state.openDialog} handleDialogToggle={() => this.handleDialogToggle()}/>
      </Drawer>
		)
	}
}

export let SideMenu = SideMenuComponent;