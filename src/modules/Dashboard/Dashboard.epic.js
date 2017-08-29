import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';

import {
	GET_WORKERS,
	GET_WORKERS_SUCCESS,
	GET_WORKERS_FAIL,
	GET_TASKS,
	GET_TASKS_SUCCESS,
	GET_TASKS_FAIL
} from './Dashboard.actions';

export class DashboardEpic {
	
	static getAllWorkers = action$ => 
		action$.ofType(GET_WORKERS)
			.switchMap(() => {
				return new Observable(observer => {
					getFirebase().ref('users').on('value', snap => {
						observer.next({ type: GET_WORKERS_SUCCESS, payload: snap.val() })
					})
				}).catch((err) => {
					return Observable.of({
						type: GET_WORKERS_FAIL,
						payload: err,
					})
				})
			})

	static getTasks = action$ =>
		action$.ofType(GET_TASKS)
			.switchMap(() => {
				return new Observable(observer => {
					getFirebase.ref('all-tasks').on('value', snap => {
						observer.next({ type: GET_TASKS_SUCCESS, payload: snap.val() })
					})
				})
			}).catch((err) => {
				return Observable.of({
					type: GET_TASKS_FAIL,
					payload: err
				})
			})
}