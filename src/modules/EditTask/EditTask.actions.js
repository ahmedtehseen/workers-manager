export const EDIT_TASK = 'EDIT_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAIL = 'EDIT_TASK_FAIL';

export const FILE_UPLOAD = 'FILE_UPLOAD';
export const FILE_UPLOAD_FAIL = 'FILE_UPLOAD_FAIL';

export const uploadTaskFile = (props) => {
	return {
		type: FILE_UPLOAD,
		payload: props
	}
}

export const editTask = (props) => {
	return {
		type: EDIT_TASK,
		payload: props,
	}
}