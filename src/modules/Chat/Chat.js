import React, { Component } from "react";
import {
  firestoreConnect
} from "react-redux-firebase";
import { connect } from "react-redux";
// styles
import "./Chat.css";

class ChatComponent extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

const wrappedChat = firestoreConnect(["tasks"])(ChatComponent);

const mapStateToProps = state => {
  return {
    tasks: state.firestore.data.tasks
  };
};

export let Chat = connect(mapStateToProps, {}, null, { forwardRef: true })(
  wrappedChat
);
