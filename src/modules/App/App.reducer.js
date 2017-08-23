import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login';

const initialState = {
	response: false,
	message: ''
}

export const AppReducer = (state = initialState, action) => {
	switch(action.type) {
		case USER_LOGIN_SUCCESS:
		case USER_LOGIN_FAIL:
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