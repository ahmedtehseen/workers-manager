import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux'
import { firebaseStateReducer } from 'react-redux-firebase'

import {
	AppReducer,
	LoginReducer
} from './modules';

export const rootInitialState = {
}

export let rootReducer = combineReducers({
	auth: LoginReducer,
	snackbar: AppReducer,
	routing: routerReducer,
	form: formReducer,
	firebase: firebaseStateReducer
});
