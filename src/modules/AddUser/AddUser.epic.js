import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';
import { 
	ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_FAIL
} from './AddUser.actions';


export class AddUserEpic {
	static addUser = (action$) =>
		action$.ofType(ADD_USER)
		.switchMap(({payload}) => {
			const { email, password, name, role } = payload;
			return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password))
				.switchMap((res) => {
					const timestamp = firebase.database.ServerValue.TIMESTAMP;
					return Observable.of({
						type: ADD_USER_SUCCESS,
						payload: { uid: res.uid, email, name, role, timestamp },
						message: 'User added successfully..!'
					})
				}).catch((err) => {
					return Observable.of({
						type: ADD_USER_FAIL,
						payload: err,
						message: 'Something went wrong, Please try again..!'
					})
				})
		})

	static createUser = (action$) =>
		action$.ofType(ADD_USER_SUCCESS)
		.switchMap(({ payload }) => {
				const { uid, name, email, role, timestamp } = payload
        return Observable.of(
          firebase.database().ref('users/'+uid)
          .set({name, email, role, timestamp, uid})
        )
      }).switchMap(()=> {
      	return Observable.of({
      		type: 'ADDED_USER'
      	})
      })
}