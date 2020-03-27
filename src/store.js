// import { createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
// import { routerMiddleware } from "react-router-redux";
// import { browserHistory } from "react-router";
// import { reactReduxFirebase } from "react-redux-firebase";
// import * as firebase from "firebase";
// import { createFirestoreInstance } from "redux-firestore";

// import { rootReducer, rootInitialState } from "./reducers";
// import { epicMiddleware } from "./epics";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const logger = createLogger({
//   collapsed: true,
//   predicate: (getState, action) => { 
//     if (action.type && action.type.startsWith("@@redux-form")) {
//       return false;
//     } else {
//       return true;
//     }
//   }
// });

// const routingMiddleware = routerMiddleware(browserHistory);

// var config = {
//   apiKey: "AIzaSyD7tTPTNkY4B3qmrDg8owvLQk67xeNLSlw",
//   authDomain: "trouble-tickets-007.firebaseapp.com",
//   databaseURL: "https://trouble-tickets-007.firebaseio.com",
//   projectId: "trouble-tickets-007",
//   storageBucket: "trouble-tickets-007.appspot.com",
//   messagingSenderId: "430323187832",
//   appId: "1:430323187832:web:0bffffabf96392b95bed8d",
//   measurementId: "G-Q42QSZ2EQ2"
// };

// firebase.initializeApp(config);

// export const store = createStore(
//   rootReducer,
//   rootInitialState,
//   composeEnhancers(
//     // reactReduxFirebase(firebase, { userProfile: "users" }),
//     applyMiddleware(epicMiddleware)
//   )
// );
