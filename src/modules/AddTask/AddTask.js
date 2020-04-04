import React, { Component } from "react";
import {
  Dialog,
  FlatButton,
  RaisedButton,
  MenuItem,
  TextField,
} from "material-ui";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import "./AddTask.css";
import { addTask, createTask } from "./AddTask.actions";
import { Input } from "@material-ui/core";
import AttachFile from "material-ui/svg-icons/editor/attach-file";

import DatePickerComponent from "./DatePickerComponent";

const themeColor = "#7AB15A";

class AddTaskComponent extends Component {
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
            taskTitle: "",
            details: "",
            dateOfSubmission: new Date(),
          }}
          onSubmit={(values) => {
            console.log(values.dateOfSubmission, "checking");
            const file = this.file.files[0];

            const status = "pending";
            const {
              dateOfSubmission,
              details,
              taskTitle,
              worker: { name, uid },
            } = values;
            const adminId = this.props.user.uid;
            const completionDate = dateOfSubmission.getTime();
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

const wrappedAddTask = firebaseConnect()(AddTaskComponent);

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
    workers: state.dashboard.workers,
  };
};

export let AddTask = connect(mapStateToProps, { addTask, createTask }, null, {
  forwardRef: true,
})(wrappedAddTask);

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
