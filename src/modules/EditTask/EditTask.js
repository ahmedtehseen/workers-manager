import React, { Component } from "react";
import {
  Dialog,
  FlatButton,
  RaisedButton,
  MenuItem,
  TextField,
} from "material-ui";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import InputLabel from "@material-ui/core/InputLabel";
import AttachFile from "material-ui/svg-icons/editor/attach-file";
import { uploadTaskFile, editTask } from "./EditTask.actions";
import "./EditTask.css";
import { Formik } from "formik";
import Select from "@material-ui/core/Select";
import DatePickerComponent from "../AddTask/DatePickerComponent";

const themeColor = "#7AB15A";

class EditTaskFormComponent extends Component {
  state = {
    worker: "",
    description: "",
    selectedDate: new Date(),
  };
  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };
  render() {
    console.log("rendered");
    console.log(this.props);
    const { workers } = this.props;
    const menuItems =
      workers && workers.filter((item) => item.role === "worker");

    return (
      <div>
        {this.props.initialValues && (
          <Formik
            initialValues={{
              worker:
                this.props.initialValues &&
                this.props.initialValues.worker.name,
              taskTitle:
                this.props.initialValues && this.props.initialValues.taskTitle,
              details:
                this.props.initialValues && this.props.initialValues.details,
              dateOfSubmission:
                this.props.initialValues &&
                this.props.initialValues.dateOfSubmission,
            }}
            onSubmit={(values) => {
              console.log(values.dateOfSubmission, "checking");
              const file = this.file.files[0];
              const completionDate = dateOfSubmission.getTime();
              const status = "pending";
              const {
                dateOfSubmission,
                details,
                taskTitle,
                worker: { name, uid },
              } = values;
              const adminId = this.props.user.uid;
              const objWithFile = {
                completionDate,
                details,
                taskTitle,
                assignTo: name,
                workerId: uid,
                file,
                adminId,
                status,
              };
              const objWithoutFile = {
                completionDate,
                details,
                taskTitle,
                assignTo: name,
                workerId: uid,
                adminId,
                status,
              };
              if (file) {
                this.props.uploadTaskFile(objWithFile);
              } else {
                this.props.editTask(objWithoutFile);
              }
              this.file = null;
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => (
              <Dialog
                title="Edit Task"
                modal={false}
                open={this.props.openEditDialog}
                onRequestClose={this.props.closeDialog}
                contentStyle={{ display: "flex", justifyContent: "center" }}
                className="task-modal"
              >
                <form className="add-task-form">
                  <div>
                    <TextField
                      name="taskTitle"
                      placeholder="Task Title"
                      value={values.taskTitle}
                      onChange={handleChange}
                      fullWidth
                    ></TextField>
                  </div>
                  <div style={{ marginTop: "0.5em" }}>
                    <InputLabel>Worker</InputLabel>
                    <Select
                      id="worker-select"
                      value={values.worker}
                      onChange={handleChange}
                      name="worker"
                      fullWidth
                    >
                      {menuItems !== null &&
                        menuItems.map((item) => (
                          <MenuItem
                            value={item}
                            key={item.uid}
                            className="worker-list-item"
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <br />
                  <div className="middle-textarea">
                    <TextField
                      placeholder="Describe your task"
                      onChange={handleChange}
                      fullWidth
                      name="details"
                      value={values.details}
                    />
                  </div>
                  <div
                    className="bottom-task-fields"
                    style={{ marginTop: "1em" }}
                  >
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
                        ref={(file) => {
                          this.file = file;
                        }}
                      />
                    </FlatButton>
                    &nbsp;&nbsp;&nbsp;
                    <DatePickerComponent
                      setFieldValue={setFieldValue}
                      name="dateOfSubmission"
                      value={values.dateOfSubmission}
                    />
                  </div>
                  <RaisedButton
                    buttonStyle={{
                      borderRadius: "2em",
                      width: "150px",
                    }}
                    style={{
                      borderRadius: "2em",
                      width: "150px",
                      marginTop: "2em",
                    }}
                    labelColor="#fff"
                    backgroundColor={themeColor}
                    label="Re-Assign Task"
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                      this.props.closeDialog();
                    }}
                  />
                </form>
              </Dialog>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

const wrappedEditTask = firebaseConnect()(EditTaskFormComponent);

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
    workers: state.dashboard.workers,
    initialValues: state.dashboard.currentTask,
  };
};

export let EditTask = connect(
  mapStateToProps,
  { uploadTaskFile, editTask },
  null,
  { forwardRef: true }
)(wrappedEditTask);

const styles = {
  uploadButton: {
    verticalAlign: "middle",
    width: "16em",
    marginTop: "5px",
    borderBottom: "1px solid rgb(224, 224, 224)",
  },
  uploadInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0,
  },
};
