export const ADD_TASK = 'ADD_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAIL = 'ADD_TASK_FAIL';

export const FILE_UPLOAD_FAIL = 'FILE_UPLOAD_FAIL';

export const addTask = (props) => {
	return {
		type: ADD_TASK,
		payload: props
	}
}

export const createTask = (props) => {
	return {
		type: CREATE_TASK,
		payload: props,
		message: 'Please wait..!'
	}
}