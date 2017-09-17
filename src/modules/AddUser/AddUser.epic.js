import * as firebase from 'firebase';
import axios from 'axios';
import { Observable } from 'rxjs';
// import { getFirebase } from 'react-redux-firebase';
import { 
	ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from './AddUser.actions';

const authenticateUser = 'https://us-central1-trouble-tickets-147f2.cloudfunctions.net/authenticateUser'

export class AddUserEpic {
	static addUser = (action$) =>
		action$.ofType(ADD_USER)
		.switchMap(({payload}) => {
			const timestamp = firebase.database.ServerValue.TIMESTAMP;
			const { email, password, name, role } = payload;
			const userObj = {email, password, name, role, timestamp}
			return Observable.fromPromise(axios.post(authenticateUser, userObj))
				.switchMap((res) => {
					if (res.data.success) {
						return Observable.of({
							type: ADD_USER_SUCCESS,
							payload: res,
							message: 'User added successfully..!'
						})
					}
					return Observable.of({
						type: ADD_USER_FAIL,
						payload: res,
						message: 'Something went wrong, Please try again..!'
					})
				}).catch((err) => {
					return Observable.of({
						type: ADD_USER_FAIL,
						payload: err,
						message: 'Something went wrong, Please try again..!'
					})
				})
		})

}