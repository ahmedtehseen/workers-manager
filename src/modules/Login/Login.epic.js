import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';
import {
	USER_LOGIN_SUCCESS,
} from './Login.actions';

export class LoginEpic {

	static userLogin = (action$) =>
		action$.ofType('@@reactReduxFirebase/LOGIN')
			.switchMap(({auth}) => {
				return new Observable(observer => {
					getFirebase().ref(`users/${auth.uid}`).once('value', snap => {
						observer.next({ type: USER_LOGIN_SUCCESS, payload: snap.val(), message: 'Login Successfully..!'})
					})
				})
			})
			
}