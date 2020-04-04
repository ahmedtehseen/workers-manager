import React, { Component } from "react";
import { Dialog, TextField, RaisedButton } from "material-ui";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { addUserSuccess, addUserFail, addUser } from "./AddUser.actions";
import { Formik } from "formik";
import * as Yup from "yup";
// styles
import "./AddUser.css";

const themeColor = "#7AB15A";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter Your Email Address")
    .email("Invalid Email"),
  password: Yup.string().required("Enter your password"),
  role: Yup.string().required("Role should be worker or admin."),
  username: Yup.string().required("Please enter your username"),
});

class AddUserFormComponent extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ username: "", email: "", password: "", role: "" }}
          onSubmit={(values, { resetForm }) => {
            this.props.addUser(values);
            this.props.handleDialogToggle();
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (
            <Dialog
              title="Add Users"
              modal={false}
              open={this.props.openDialog}
              onRequestClose={this.props.handleDialogToggle}
              contentStyle={{ display: "flex", justifyContent: "center" }}
              className="add-user-modal"
            >
              <form className="signup-form">
                <TextField
                  floatingLabelText={"Username"}
                  type={"text"}
                  underlineFocusStyle={{ borderColor: themeColor }}
                  floatingLabelStyle={{ color: themeColor }}
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  errorText={
                    errors.username && touched.username ? errors.username : ""
                  }
                />
                <TextField
                  floatingLabelText={"Email"}
                  type={"email"}
                  underlineFocusStyle={{ borderColor: themeColor }}
                  floatingLabelStyle={{ color: themeColor }}
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  errorText={errors.email && touched.email ? errors.email : ""}
                />
                <TextField
                  floatingLabelText={"Password"}
                  type={"password"}
                  underlineFocusStyle={{ borderColor: themeColor }}
                  floatingLabelStyle={{ color: themeColor }}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  errorText={
                    errors.password && touched.password ? errors.password : ""
                  }
                />
                <TextField
                  floatingLabelText={"Role"}
                  type={"text"}
                  underlineFocusStyle={{ borderColor: themeColor }}
                  floatingLabelStyle={{ color: themeColor }}
                  name="role"
                  onChange={handleChange}
                  value={values.role}
                  errorText={errors.role && touched.role ? errors.role : ""}
                />
                <RaisedButton
                  buttonStyle={{
                    borderRadius: "2em",
                    width: "150px",
                  }}
                  style={{
                    borderRadius: "2em",
                    width: "150px",
                    marginLeft: "3em",
                    marginTop: "2em",
                  }}
                  labelColor="#fff"
                  backgroundColor={themeColor}
                  label="Add User"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
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

const wrappedAddUser = firebaseConnect()(AddUserFormComponent);

const mapStateToProps = (state) => {
  return {};
};

export let AddUser = connect(
  mapStateToProps,
  { addUserSuccess, addUserFail, addUser },
  null,
  { forwardRef: true }
)(wrappedAddUser);
