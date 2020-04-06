import React, { Component } from "react";
import { connect } from "react-redux";
import {
  firebaseConnect,
  populate,
  firestoreConnect,
} from "react-redux-firebase";
import moment from "moment";
import { RaisedButton, IconButton } from "material-ui";
import NoteAdd from "material-ui/svg-icons/action/note-add";
// import Menu from 'material-ui/svg-icons/navigation/menu';
import Alarm from "material-ui/svg-icons/action/alarm";
import AttachFile from "material-ui/svg-icons/editor/attach-file";
import Note from "material-ui/svg-icons/av/note";
import Delete from "material-ui/svg-icons/action/delete";
import { AddNotes } from "./AddNotes";
import { DeliverTask } from "./DeliverTask";
// actions
import { deleteNote } from "../Dashboard.actions";
// styles
import styles from "../Dashboard.styles";

const themeColor = "#7AB15A";

class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isDeliverDialogOpen: false,
    };
  }

  handleDeleteNote(taskKey, noteKey, adminNote) {
    this.props.deleteNote({ taskKey, noteKey, adminNote });
  }

  handleDialogToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleDeliverDialogToggle() {
    this.setState({ isDeliverDialogOpen: !this.state.isDeliverDialogOpen });
  }

  render() {
    console.log(this.props);
    const { user, tasks } = this.props;
    const key = this.props.match.params.id;
    console.log(key);
    return (
      <div>
        <div style={styles.taskHeader}>
          <p style={styles.taskText}>
            {tasks && key !== undefined
              ? tasks && key !== null
                ? tasks[key].taskTitle
                : ""
              : ""}
          </p>
          <RaisedButton
            label="Add Notes"
            buttonStyle={{ borderRadius: "2em", width: "130px" }}
            icon={<NoteAdd />}
            style={{ borderRadius: "2em", width: "130px", marginTop: "2em" }}
            backgroundColor={themeColor}
            labelColor="#fff"
            labelStyle={{ fontSize: "10px" }}
            className="task-button"
            onClick={() => this.handleDialogToggle()}
          />
        </div>
        <div className="taskBodyContainer">
          <div className="task-time-section">
            <div className="task-time-left">
              <Alarm color={themeColor} />
              &nbsp;&nbsp;&nbsp;
              <p>
                <i>
                  {tasks && key !== undefined
                    ? tasks && key !== null
                      ? moment(tasks[key].completionDate).format("Do,MMM,YYYY")
                      : ""
                    : ""}
                </i>
              </p>
            </div>
            <span className="task-time-right">
              Status:{" "}
              <i>
                {tasks && key !== undefined
                  ? tasks && key !== null
                    ? tasks[key].status
                    : ""
                  : ""}
              </i>
            </span>
          </div>
          <div className="task-description-section">
            <p>
              {tasks && key !== undefined
                ? tasks && key !== null
                  ? tasks[key].details
                  : ""
                : ""}
            </p>
          </div>
          <div>
            {tasks && key !== undefined ? (
              tasks && key !== null ? (
                tasks[key].fileURL ? (
                  <a href={tasks[key].fileURL} className="task-file-section">
                    <AttachFile style={{ transform: "rotate(45deg)" }} />
                    <span>Attachment</span>
                  </a>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          {tasks && key !== undefined ? (
            tasks && key !== null ? (
              tasks[key].adminNotes || tasks[key].workerNotes !== undefined ? (
                <div className="task-notes-section">
                  <div className="notes-container">
                    {tasks[key].adminNotes !== undefined ? (
                      <div className="admin-notes">
                        <h3>Notes by Admin:</h3>
                        {Object.keys(tasks[key].adminNotes).map((noteKey) => {
                          return (
                            <p key={noteKey} className="note">
                              <Note color={themeColor} />
                              &nbsp;
                              {tasks[key].adminNotes[noteKey].note}
                              &nbsp;&nbsp;
                              {this.props.user.role === "admin" ? (
                                <IconButton
                                  tooltip="Delete"
                                  onClick={() =>
                                    this.handleDeleteNote(key, noteKey, true)
                                  }
                                >
                                  <Delete color={themeColor} />
                                </IconButton>
                              ) : (
                                ""
                              )}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                    {tasks[key].workerNotes !== undefined ? (
                      <div className="worker-notes">
                        <h3>Notes by Worker:</h3>
                        {Object.keys(tasks[key].workerNotes).map((noteKey) => {
                          return (
                            <p key={noteKey} className="note">
                              <Note color={themeColor} />
                              &nbsp;
                              {tasks[key].workerNotes[noteKey].note}
                              &nbsp;&nbsp;
                              <IconButton tooltip="Delete">
                                <Delete
                                  color={themeColor}
                                  onClick={() =>
                                    this.handleDeleteNote(key, noteKey, false)
                                  }
                                />
                              </IconButton>
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {user !== null ? (
            user.role === "worker" ? (
              tasks && key !== null ? (
                tasks[key].status === "pending" ? (
                  <div>
                    <RaisedButton
                      label="Deliver Now"
                      buttonStyle={{ borderRadius: "2em", width: "200px" }}
                      style={{
                        borderRadius: "2em",
                        width: "200px",
                        margin: "0 1.5em 2em",
                      }}
                      backgroundColor={themeColor}
                      labelColor="#fff"
                      labelStyle={{ fontSize: "12px" }}
                      className=""
                      onClick={() => this.handleDeliverDialogToggle()}
                    />
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        <AddNotes
          isOpen={this.state.isOpen}
          handleDialogToggle={() => this.handleDialogToggle()}
          taskKey={key}
        />
        <DeliverTask
          isOpen={this.state.isDeliverDialogOpen}
          handleDialogToggle={() => this.handleDeliverDialogToggle()}
          task={
            tasks && key !== undefined
              ? tasks && key !== null
                ? tasks[key]
                : null
              : null
          }
          taskKey={key}
        />
      </div>
    );
  }
}

const wrappedTask = firestoreConnect(["tasks"])(TaskComponent);

const mapStateToProps = (state) => {
  return {
    tasks: state.firestore.data.tasks,
    user: state.auth.user,
  };
};

export let Task = connect(mapStateToProps, { deleteNote }, null, {
  forwardRef: true,
})(wrappedTask);
