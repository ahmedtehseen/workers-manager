import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
	IconButton,
  IconMenu,
  MenuItem
} from 'material-ui'

const TableMenuButton = (props) => {
	return (
		<IconMenu
      iconButtonElement={<IconButton className='menu-icon'><MoreVertIcon color={'#7AB15A'} /></IconButton>}
    >
      <MenuItem primaryText="Edit Task" onClick={props.toggleEditDailog}/>
      <MenuItem primaryText="Re-Assign" />
      <MenuItem primaryText="Send message to worker" />
      <MenuItem primaryText="Delete Task" onClick={props.deleteTask}/>
    </IconMenu>
	)
}

export {TableMenuButton};