import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login';
import {
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from '../AddUser';

export class AppEpic {
	
	static hideSnackbar = action$ =>
		action$.ofType(
			USER_LOGIN_SUCCESS, 
			USER_LOGIN_FAIL,
			ADD_USER_SUCCESS,
			ADD_USER_FAIL)
				.delay(3000)
				.mapTo({
					type: 'HIDE_SNACKBAR'
				})

}