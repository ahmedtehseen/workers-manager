import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.css";
import Root from "./App";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./reducers";
import firebase from "./config/firebase";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { epicMiddleware } from "./epics";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(epicMiddleware))
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Root />
      </ReactReduxFirebaseProvider>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
