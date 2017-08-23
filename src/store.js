import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';


import { rootReducer, rootInitialState } from './reducers';
import { epicMiddleware } from './epics';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
  predicate: (getState: Function, action: Object) => {
    if (action.type && action.type.startsWith('@@redux-form')) {
      return false
    } else {
      return true
    }
  }
});


const routingMiddleware = routerMiddleware(browserHistory)

var config = {
  apiKey: "AIzaSyAoebI0ljWw-UylmtFJLEGhV6Seoy-qxUE",
  authDomain: "trouble-tickets-147f2.firebaseapp.com",
  databaseURL: "https://trouble-tickets-147f2.firebaseio.com",
  projectId: "trouble-tickets-147f2",
  storageBucket: "trouble-tickets-147f2.appspot.com",
  messagingSenderId: "652356577326"
};

firebase.initializeApp(config)


export const store = createStore(rootReducer, rootInitialState, composeEnhancers(
	reactReduxFirebase(config, { userProfile: 'users' }),
  applyMiddleware(logger, epicMiddleware, routingMiddleware)
));
