import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import {
  AppReducer,
  LoginReducer,
  DashboardReducer,
  ChatReducer
} from "./modules";

export const rootInitialState = {};

export let rootReducer = combineReducers({
  auth: LoginReducer,
  app: AppReducer,
  dashboard: DashboardReducer,
  chat: ChatReducer,
  routing: routerReducer,
  form: formReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
