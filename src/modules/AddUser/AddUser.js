import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Dialog, TextField, RaisedButton } from "material-ui";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { addUserSuccess, addUserFail, addUser } from "./AddUser.actions";
// styles
import "./AddUser.css";
import {connectAdvanced} from 'react-redux';

const themeColor = "#7AB15A";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, invalid }
}) => {
  return (
    <TextField
      floatingLabelText={label}
      errorText={touched ? error : ""}
      type={type}
      underlineFocusStyle={{ borderColor: themeColor }}
      floatingLabelStyle={{ color: themeColor }}
      {...input}
    />
  );
};

class AddUserComponent extends Component {
  onFormSubmit(props) {
    this.props.addUser(props);
    this.props.reset();
    this.props.handleDialogToggle();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Dialog
        title="Add Users"
        modal={false}
        open={this.props.openDialog}
        onRequestClose={this.props.handleDialogToggle}
        contentStyle={{ display: "flex", justifyContent: "center" }}
        className="add-user-modal"
      >
        <form
          onSubmit={handleSubmit(props => this.onFormSubmit(props))}
          className="signup-form"
        >
          <Field
            name="name"
            component={renderField}
            label="User Name"
            type="text"
          />
          <Field
            name="email"
            component={renderField}
            label="Email"
            type="email"
          />
          <Field
            name="password"
            component={renderField}
            label="Password"
            type="password"
          />
          <Field name="role" component={renderField} label="Role" type="text" />
          <RaisedButton
            buttonStyle={{
              borderRadius: "2em",
              width: "150px"
            }}
            style={{
              borderRadius: "2em",
              width: "150px",
              marginLeft: "3em",
              marginTop: "2em"
            }}
            labelColor="#fff"
            backgroundColor={themeColor}
            label="Add User"
            type="submit"
          />
        </form>
      </Dialog>
    );
  }
}

const wrappedAddUser = firebaseConnect()(AddUserComponent);

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required.";
  }

  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  if (values.password ? values.password.length < 6 : "") {
    errors.password = "Please use at least 6 characters.";
  }

  if (!values.name) {
    errors.name = "Please enter user name.";
  }

  if (!values.role) {
    errors.role = "Please enter user role.";
  }

  if (values.role !== "worker" && values.role !== "admin") {
    errors.role = "Role should be worker or admin.";
  }

  return errors;
}

const form = reduxForm({
  form: "CreateUserForm",
  validate
});

const mapStateToProps = state => {
  return {};
};

export let AddUser = connect(
  mapStateToProps,
  { addUserSuccess, addUserFail, addUser },
  null,
  { forwardRef: true }
)(form(wrappedAddUser));
