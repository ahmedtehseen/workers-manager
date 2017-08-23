import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL
} from '../Login'

export class AppEpic {
	static hideSnackbar = action$ =>
		action$.ofType(
			USER_LOGIN_SUCCESS, 
			USER_LOGIN_FAIL)
				.delay(3000)
				.mapTo({
					type: 'HIDE_SNACKBAR'
				})
		
}