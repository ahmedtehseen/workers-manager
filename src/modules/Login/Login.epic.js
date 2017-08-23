import { Observable } from 'rxjs';

import {
	USER_LOGIN_SUCCESS,
} from './Login.actions';

export class LoginEpic {

	static userLogin = (action$) =>
		action$.ofType('@@reactReduxFirebase/LOGIN')
			.switchMap((res) => {
				return Observable.of({
					type: USER_LOGIN_SUCCESS,
					message: 'Login Successfull..!'
				})
			})
}