import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login';
import {
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from '../AddUser';

import {
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAIL,
	DELIVER_TASK_SUCCESS,
	DELIVER_TASK_FAIL,
	REASSIGN_TASK_SUCCESS,
	REASSIGN_TASK_FAIL,
} from '../Dashboard';

export class AppEpic {
	
	static hideSnackbar = action$ =>
		action$.ofType(
			USER_LOGIN_SUCCESS, 
			USER_LOGIN_FAIL,
			ADD_USER_SUCCESS,
			ADD_USER_FAIL,
			DELETE_TASK_SUCCESS,
			DELETE_TASK_FAIL,
			DELIVER_TASK_SUCCESS,
			DELIVER_TASK_FAIL,
			REASSIGN_TASK_SUCCESS,
			REASSIGN_TASK_FAIL)
				.delay(3000)
				.mapTo({
					type: 'HIDE_SNACKBAR'
				})

}