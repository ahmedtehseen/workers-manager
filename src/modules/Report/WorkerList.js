import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect, populate } from "react-redux-firebase";
import { Link } from "react-router";
import { List, ListItem, Subheader, Avatar } from "material-ui";

 export class WorkerListComponent extends Component {
  render() {
    return (
      <List>
        <Subheader>Reports</Subheader>
        {this.props.workers && this.props.user !== null
          ? Object.keys(this.props.workers)
              .filter(key => this.props.workers[key].role === "worker")
              .map(key => (
                <Link to={`/reports/${key}`} key={key} className="link-mode">
                  <ListItem
                    key={key}
                    primaryText={this.props.workers[key].name}
                    leftAvatar={
                      <Avatar src={process.env.PUBLIC_URL + "/avatar.png"} />
                    }
                  />
                </Link>
              ))
          : ""}
      </List>
    );
  }
}

const wrappedWorkerList = firebaseConnect(["all-tasks"])(WorkerListComponent);

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    workers: state.dashboard.workers,
    tasks: populate(state.firebase, "all-tasks")
  };
};

export let WorkerList = connect(mapStateToProps, {})(wrappedWorkerList);
