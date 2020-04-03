import React, { Component } from "react";
import {
  Dialog,
  FlatButton,
  RaisedButton,
  MenuItem,
  TextField
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
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
// import DateFnsUtils from "@date-io/date-fns";
import DatePickerComponent from "./DatePickerComponent";
import flower from "./../../images/flower 2.png";

const themeColor = "#7AB15A";

class AddTaskComponent extends Component {
  state = {
    worker: "",
    description: "",
    selectedDate: new Date()
  };

  handleWorkerChange(event) {
    this.setState({
      worker: event.target.value
    });
  }
  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }
  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };
  render() {
    console.log(this.props.workers);
    const { workers } = this.props;
    const menuItems = workers && workers.filter(item => item.role === "worker");

    return (
      <div>
        <Formik
          initialValues={{
            task: "",
            worker: this.state.worker,
            description: this.state.description
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
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
                    name="task"
                    placeholder="Task Title"
                    value={values.task}
                    onChange={handleChange}
                  ></TextField>

                  <Select
                    id="worker-select"
                    onChange={e => this.handleWorkerChange(e)}
                  >
                    {menuItems !== null &&
                      menuItems.map(item => (
                        <MenuItem
                          value={item.name}
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
                    // value={values.description}
                    onChange={e => this.handleDescriptionChange(e)}
                    fullWidth
                    name="description"
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
                      ref={file => {
                        this.file = file;
                      }}
                    />
                  </FlatButton>
                  &nbsp;&nbsp;&nbsp;
                  <DatePickerComponent />
                </div>
              </form>
            </Dialog>
          )}
        </Formik>
      </div>
    );
  }
}

const wrappedAddTask = firebaseConnect()(AddTaskComponent);

const mapStateToProps = state => {
  return {
    user: state.firebase.auth,
    workers: state.dashboard.workers
  };
};

export let AddTaskForm = connect(
  mapStateToProps,
  { addTask, createTask },
  null,
  {
    forwardRef: true
  }
)(wrappedAddTask);

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
