import React, { Component } from "react";
import { Link } from "react-router";
import { Drawer, AppBar, IconButton, MenuItem } from "material-ui";
import Menu from "material-ui/svg-icons/navigation/menu";
// import { AddTask } from "../../AddTask";
// styles
import styles from "./SideMenu.styles";
import { NavLink } from "react-router-dom";

import { AddTask } from "../../AddTask";
// import AddTaskDialog from "../../AddTask/AddTaskDialog";

class SideMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }

  handleDialogToggle() {
    console.log("open dialogue");
    this.setState({ openDialog: !this.state.openDialog });
  }

  render() {
    const { userRole } = this.props;
    return (
      <Drawer width={200} open={true} containerStyle={styles.sidemenu}>
        <AppBar
          iconElementLeft={
            <img
              src={`${process.env.PUBLIC_URL}/headerLogo.jpg`}
              alt="logo"
              style={styles.logo}
            />
          }
          iconElementRight={
            <IconButton>
              <Menu style={{}} color={"#fff"} hoverColor={"#E0E0E0"} />
            </IconButton>
          }
          style={styles.navbar}
        />
        <MenuItem
          className="sidemenu-menuitem"
          style={{
            color: "#fff",
            fontSize: "14px",
            marginTop: "2em"
          }}
        >
          <NavLink to="/dashboard">
            {userRole !== null && userRole === "admin"
              ? "Manager Dashboard"
              : "Worker Dashboard"}
          </NavLink>
        </MenuItem>
        <MenuItem
          className="sidemenu-menuitem"
          style={{
            color: "#fff",
            fontSize: "14px"
          }}
        >
          <NavLink to="/dashboard/total-tasks">Total Tasks</NavLink>
        </MenuItem>
        {userRole !== null && userRole === "admin" ? (
          <MenuItem
            onClick={() => this.handleDialogToggle()}
            style={{
              color: "#fff",
              fontSize: "14px"
            }}
          >
            Assign a Task
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem
          className="sidemenu-menuitem"
          style={{
            color: "#fff",
            fontSize: "14px"
          }}
        >
          <NavLink to="/dashboard/completed-tasks">Completed Tasks</NavLink>
        </MenuItem>
        {userRole !== null && userRole === "admin" ? (
          <MenuItem
            className="sidemenu-menuitem"
            style={{
              color: "#fff",
              fontSize: "14px"
            }}
          >
            <NavLink to="/dashboard/workers">Workers</NavLink>
          </MenuItem>
        ) : (
          <MenuItem
            className="sidemenu-menuitem"
            style={{
              color: "#fff",
              fontSize: "14px"
            }}
          >
            <NavLink to="/chat">Contact Manager</NavLink>
          </MenuItem>
        )}
        {userRole !== null && userRole === "worker" ? (
          <MenuItem
            onClick={() => {}}
            style={{
              color: "#fff",
              fontSize: "14px"
            }}
          >
            Help
          </MenuItem>
        ) : (
          ""
        )}
        {userRole !== null && userRole === "admin" ? (
          <MenuItem
            className="sidemenu-menuitem"
            style={{
              color: "#fff",
              fontSize: "14px"
            }}
          >
            <NavLink to="/dashboard/reports">Reports</NavLink>
          </MenuItem>
        ) : (
          ""
        )}
        <AddTask
          openDialog={this.state.openDialog}
          handleDialogToggle={() => this.handleDialogToggle()}
        />
      </Drawer>
    );
  }
}

export let SideMenu = SideMenuComponent;
