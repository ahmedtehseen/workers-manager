import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import moment from "moment";
import { reduxForm, Field } from "redux-form";
import { TextField } from "redux-form-material-ui";
import { Dialog, FlatButton, RaisedButton } from "material-ui";
import AttachFile from "material-ui/svg-icons/editor/attach-file";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
// actions
import { deliverTask } from "../Dashboard.actions";

const themeColor = "#7AB15A";

class DeliverTaskComponent extends Component {
  onFormSubmit(props) {
    this.props.deliverTask(this.props.taskKey);
    this.props.reset();
    this.props.handleDialogToggle();
  }

  render() {
    const { handleSubmit, task } = this.props;
    return (
      <Dialog
        title={
          <div>
            <span className="deliver-task-modal-title">
              {task !== null ? task.taskTitle : ""}
            </span>
            <span className="deliver-task-modal-time">
              Date Pending:{" "}
              {task !== null
                ? moment(task.completionDate).format("Do MMM,YYYY")
                : ""}
            </span>
          </div>
        }
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleDialogToggle}
        contentStyle={{ display: "flex", justifyContent: "center" }}
        className="deliver-task-modal"
      >
        <form
          onSubmit={handleSubmit(props => this.onFormSubmit(props))}
          className="add-task-form"
        >
          <div className="top-task-fileds">
            <Field
              name="taskTitle"
              component={TextField}
              hintText="Task Title"
              type="text"
            />
          </div>
          <br />
          <div className="middle-textarea">
            <Field
              name="description"
              multiLine={true}
              rows={3}
              component={TextField}
              hintText="Describe what you have done..."
              fullWidth={true}
              rowsMax={5}
            />
          </div>
          <br />
          <div className="bottom-task-fields">
            <FlatButton
              label="Add Attachment"
              backgroundColor={"#fff"}
              labelPosition="before"
              style={styles.uploadButton}
              containerElement="label"
              hoverColor={"#fff"}
              icon={<AttachFile color={"#E0E0E0"} />}
              labelStyle={{ color: "#E0E0E0" }}
            >
              <input
                type="file"
                style={styles.uploadInput}
                ref={file => {
                  this.file = file;
                }}
              />
            </FlatButton>
          </div>
          <RaisedButton
            buttonStyle={{
              borderRadius: "2em",
              width: "160px"
            }}
            style={{
              borderRadius: "2em",
              width: "160px",
              marginTop: "2em"
            }}
            icon={<CheckCircle />}
            labelColor="#fff"
            backgroundColor={themeColor}
            label="Deliver Task"
            type="submit"
          />
        </form>
      </Dialog>
    );
  }
}

const wrappedDeliverTask = firebaseConnect()(DeliverTaskComponent);

function validate(values) {
  const errors = {};
  if (!values.taskTitle) {
    errors.taskTitle = "Title is required.";
  }

  if (!values.description) {
    errors.description = "Please provide some details.";
  }

  return errors;
}

const form = reduxForm({
  form: "DeliverTaskForm",
  validate
});

const mapStateToProps = state => {
  return {
    user: state.firebase.auth
  };
};

export let DeliverTask = connect(mapStateToProps, { deliverTask })(
  form(wrappedDeliverTask)
);

const styles = {
  uploadButton: {
    verticalAlign: "middle",
    width: "16em",
    marginTop: "5px",
    borderBottom: "1px solid rgb(224, 224, 224)"
  },
  uploadInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
};
