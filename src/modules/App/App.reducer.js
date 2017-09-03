import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login';

import {
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from '../AddUser';

import {
	CREATE_TASK,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAIL,
	FILE_UPLOAD_FAIL
} from '../AddTask';

import {
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAIL,
	DELIVER_TASK_SUCCESS,
	DELIVER_TASK_FAIL,
	REASSIGN_TASK_SUCCESS,
	REASSIGN_TASK_FAIL,
} from '../Dashboard';


const initialState = {
	response: false,
	message: ''
}

export const AppReducer = (state = initialState, action) => {
	switch(action.type) {
		case USER_LOGIN_SUCCESS:
		case USER_LOGIN_FAIL:
		case ADD_USER_SUCCESS:
		case ADD_USER_FAIL:
		case CREATE_TASK:
		case ADD_TASK_SUCCESS:
		case ADD_TASK_FAIL:
		case FILE_UPLOAD_FAIL:
		case DELETE_TASK_SUCCESS:
		case DELETE_TASK_FAIL:
		case DELIVER_TASK_SUCCESS:
		case DELIVER_TASK_FAIL:
		case REASSIGN_TASK_SUCCESS:
		case REASSIGN_TASK_FAIL:
			return Object.assign({}, state, {
				response: true,
				message: action.message
			})
		case 'HIDE_SNACKBAR':
			return initialState
		default:
			return state
	}
}