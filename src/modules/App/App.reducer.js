import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login';

import {
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from '../AddUser';


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