import React from "react";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
// import { Link } from "react-router";
import { IconButton, IconMenu, MenuItem } from "material-ui";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const TableMenuButton = (props) => {
  const history = useHistory();
  return (
    <IconMenu
      iconButtonElement={
        <IconButton className="menu-icon">
          <MoreVertIcon color={"#7AB15A"} />
        </IconButton>
      }
    >
      <MenuItem primaryText="Edit Task" onClick={props.openDailog} />
      <MenuItem
        primaryText="Re-Assign"
        onClick={props.reAssignTask}
        disabled={props.task.status === "pending" ? true : false}
      />
      {/* <Link
        to={`/dashboard/chat/${props.task.workerId}`}
        className="link-mode"
      >
        <MenuItem primaryText="Send message to worker" />
      </Link> */}
      <MenuItem
        primaryText="Send message to worker"
        onClick={() => history.push(`/dashboard/chat/${props.task.workerId}`)}
      />
      <MenuItem primaryText="Delete Task" onClick={props.deleteTask} />
    </IconMenu>
  );
};

export { TableMenuButton };
