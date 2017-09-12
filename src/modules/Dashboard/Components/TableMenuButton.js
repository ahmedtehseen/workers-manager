import React from 'react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router';
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
      <MenuItem primaryText="Re-Assign" onClick={props.reAssignTask} disabled={props.task.status === 'pending' ? true : false}/>
      <Link to={`/chat/${props.task.workerId}`} className='link-mode'><MenuItem primaryText="Send message to worker" /></Link>
      <MenuItem primaryText="Delete Task" onClick={props.deleteTask}/>
    </IconMenu>
	)
}

export {TableMenuButton};