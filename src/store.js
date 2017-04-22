import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';


import { rootReducer, rootInitialState } from './reducers';
import { epicMiddleware } from './epics';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
});


export const store = createStore(rootReducer, rootInitialState, composeEnhancers(
  applyMiddleware(logger, epicMiddleware)
));
