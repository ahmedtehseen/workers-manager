import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router";
import { List, ListItem, Subheader, Avatar } from "material-ui";
import { NavLink } from "react-router-dom";

export class ChatListComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <List>
        <Subheader>
          {this.props.user !== null
            ? this.props.user.role === "admin"
              ? "Workers List"
              : "Admin List"
            : ""}
        </Subheader>
        {this.props.workers && this.props.user !== null
          ? this.props.user.role === "admin"
            ? Object.keys(this.props.workers)
                .filter(key => this.props.workers[key].role === "worker")
                .map(key => (
                  <NavLink
                    to={`/dashboard/chat/${key}`}
                    key={key}
                    className="link-mode"
                  >
                    <ListItem
                      key={key}
                      primaryText={this.props.workers[key].name}
                      leftAvatar={
                        <Avatar src={process.env.PUBLIC_URL + "/avatar.png"} />
                      }
                    />
                  </NavLink>
                ))
            : Object.keys(this.props.workers)
                .filter(key => this.props.workers[key].role === "admin")
                .map(key => (
                  <NavLink
                    to={`/dashboard/chat/${key}`}
                    key={key}
                    className="link-mode"
                  >
                    <ListItem
                      key={key}
                      primaryText={this.props.workers[key].name}
                      leftAvatar={
                        <Avatar src={process.env.PUBLIC_URL + "/avatar.png"} />
                      }
                    />
                  </NavLink>
                ))
          : ""}
      </List>
    );
  }
}

const wrappedChatList = firebaseConnect()(ChatListComponent);

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    workers: state.dashboard.workers
  };
};

export let ChatList = connect(mapStateToProps, {})(wrappedChatList);
