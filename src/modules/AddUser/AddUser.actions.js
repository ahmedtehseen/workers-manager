export const ADD_USER_SUCCESS = 'USER_ADDED_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';
export const ADD_USER = 'ADD_USER';

export const addUser = (props) => {
	return {
		type: ADD_USER,
		payload: props
	}
} 

export const addUserSuccess = (res) => {
	return {
		type: ADD_USER_SUCCESS,
		payload: res,
		message: 'user added successfully..!'
	}
}

export const addUserFail = (err) => {
	return {
		type: ADD_USER_FAIL,
		payload: err,
		message: 'Something went wrong, Please try again..!'
	}
}