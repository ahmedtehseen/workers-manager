import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, Divider, TextField, RaisedButton } from "material-ui";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginSuccess, loginFail } from "./Login.actions";
import { firestoreConnect } from "react-redux-firebase";
import firebase from "../../config/firebase";
// css
import "./Login.css";
const themeColor = "#7AB15A";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter Your Email Address")
    .email("Invalid Email"),
  password: Yup.string().required("Enter your password")
});

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            firebase
              .auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(res => {
                return this.props.loginSuccess(res);
              })
              .then(() => this.props.history.push("/dashboard"))
              .catch(err => this.props.loginFail(err));
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
            <div className="login-container">
              <Paper className="login-paper" zDepth={2}>
                <h2 className="text-center">Login Form</h2>
                <Divider />
                <form className="login-form">
                  <TextField
                    floatingLabelText={"Email"}
                    errorText={
                      errors.email && touched.email ? errors.email : ""
                    }
                    type={"email"}
                    underlineFocusStyle={{ borderColor: themeColor }}
                    floatingLabelStyle={{ color: themeColor }}
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <TextField
                    floatingLabelText={"Password"}
                    errorText={
                      errors.password && touched.password ? errors.password : ""
                    }
                    type={"password"}
                    underlineFocusStyle={{ borderColor: themeColor }}
                    floatingLabelStyle={{ color: themeColor }}
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <RaisedButton
                    buttonStyle={{
                      borderRadius: "2em",
                      width: "150px"
                    }}
                    style={{
                      borderRadius: "2em",
                      width: "150px"
                    }}
                    labelColor="#fff"
                    backgroundColor={themeColor}
                    label="Login"
                    type="submit"
                    onClick={handleSubmit}
                  />
                  <br />
                </form>
              </Paper>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const wrappedLogin = firestoreConnect()(LoginContainer);

export let Login = connect(
  mapStateToProps,
  { loginSuccess, loginFail },
  null,
  { forwardRef: true }
)(wrappedLogin);
