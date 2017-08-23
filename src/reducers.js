import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import {
	CounterInitialState,
 	CounterReducer 
} from './containers';

export const rootInitialState = {
}

export let rootReducer = combineReducers({
	counter: CounterReducer,
	form: formReducer,
	routing: routerReducer,
	firebase: firebaseStateReducer
});
