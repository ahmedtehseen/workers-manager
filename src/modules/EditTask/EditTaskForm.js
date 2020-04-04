import React, { Component } from "react";
import { Dialog, FlatButton, RaisedButton, MenuItem } from "material-ui";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { SelectField, TextField, DatePicker } from "redux-form-material-ui";
import AttachFile from "material-ui/svg-icons/editor/attach-file";
import { uploadTaskFile, editTask } from "./EditTask.actions";
import "./EditTask.css";
import { Formik } from "formik";
import Select from "@material-ui/core/Select";
import DatePickerComponent from "./../AddTask/DatePickerComponent";

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
    console.log(this.props.workers);
    const { workers } = this.props;
    const menuItems =
      workers && workers.filter((item) => item.role === "worker");

    return (
      <div>
        <Formik
          initialValues={{
            worker: "",
            taskTitle: this.props.initialValues.taskTitle,
            details: this.props.initialValues.details,
            dateOfSubmission: new Date(),
          }}
          onSubmit={(values) => {
            console.log(values.dateOfSubmission, "checking");
            const file = this.file.files[0];
            const completionDate = values.dateOfSubmission.getTime();
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
              this.props.addTask(objWithFile);
            } else {
              this.props.createTask(objWithoutFile);
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
              title="Create A New Task"
              modal={false}
              open={this.props.openDialog}
              onRequestClose={this.props.handleDialogToggle}
              contentStyle={{ display: "flex", justifyContent: "center" }}
              className="task-modal"
            >
              <form className="add-task-form">
                <div className="top-task-fileds">
                  <TextField
                    name="taskTitle"
                    placeholder="Task Title"
                    value={values.taskTitle}
                    onChange={handleChange}
                  ></TextField>

                  <Select
                    id="worker-select"
                    value={values.worker}
                    onChange={handleChange}
                    name="worker"
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
                  label="Assign Task"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    this.props.handleDialogToggle();
                  }}
                />
              </form>
            </Dialog>
          )}
        </Formik>
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

export let EditTaskForm = connect(
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
