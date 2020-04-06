import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Subheader, TextField, Divider, RaisedButton } from "material-ui";
import ChatBubble from "react-chat-bubble";

import {
  sendMessage,
  getActiveConversion,
  resetConversation,
} from "./Chat.actions";

import "./Chat.css";


const themeColor = "#7AB15A";

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.props.getActiveConversion(
      this.props.match.params.id,
      this.props.user ? this.props.user.uid : ""
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.props.resetConversation();
  }

  renderChat() {
    if (this.props.activeConversation !== 0) {
      return (
        <ChatBubble
          messages={this.props.activeConversation}
          onNewMessage={(e) => this.handleSubmit(e)}
        />
      );
    } else {
      return "";
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.message.length !== 0) {
      const obj = {
        from: this.props.user.uid,
        text: this.state.message,
        to: this.props.match.params.id,
        image: `${process.env.PUBLIC_URL + "/avatar.png"}`,
      };

      obj.type = this.props.user.uid === obj.from ? 0 : 1;
      this.props.sendMessage(obj);
    }
    this.setState({
      message: "",
    });
  }
  render() {
    const key = this.props.match.params.id;
    const worker =
      this.props.users && this.props.users.filter((item) => item.uid === key);
    return (
      <>
        {/* <Dashboard /> */}
        <div className="chatbox-container">
          <div>
            <Subheader>{worker[0].name}</Subheader>
            <Divider />
          </div>
          <div className="chat-area">
            {this.renderChat()}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div>
            <Divider />
            <form onSubmit={(e) => this.handleSubmit(e)} className="chat-form">
              <TextField
                hintText="Start your chat here..."
                fullWidth={true}
                value={this.state.message}
                underlineFocusStyle={{ borderColor: themeColor }}
                onChange={(e) => this.setState({ message: e.target.value })}
                className="message-input"
              />
              <RaisedButton
                label="Send"
                type="submit"
                style={{ boxShadow: "none", marginTop: "5px" }}
                labelColor="#fff"
                backgroundColor={themeColor}
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

const wrappedChatComponent = firebaseConnect()(ChatComponent);

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    activeConversation: state.chat.activeConversation,
    users: state.dashboard.workers,
  };
};

export let ChatBox = connect(
  mapStateToProps,
  {
    sendMessage,
    getActiveConversion,
    resetConversation,
  },
  null,
  { forwardRef: true }
)(wrappedChatComponent);
