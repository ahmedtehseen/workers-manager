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
      iconButtonElement={<IconButton className='menu-icon'><MoreVertIcon /></IconButton>}
    >
      <MenuItem primaryText="Edit Task" />
      <MenuItem primaryText="Re-Assign" />
      <MenuItem primaryText="Send message to worker" />
      <MenuItem primaryText="Delete Task" />
    </IconMenu>
	)
}

export {TableMenuButton};