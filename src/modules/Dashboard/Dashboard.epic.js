import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';

import {
	GET_WORKERS,
	GET_WORKERS_SUCCESS,
	GET_WORKERS_FAIL,
	DELETE_TASK,
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAIL,
	ADD_NOTE,
	ADD_NOTE_SUCCESS, 
	ADD_NOTE_FAIL,
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

	static deleteTask = action$ => 
		action$.ofType(DELETE_TASK)
			.switchMap(({payload}) => {
				return Observable.of(getFirebase().remove(`all-tasks/${payload}`))
			})
				.switchMap(res => {
					return Observable.of({
						type: DELETE_TASK_SUCCESS,
						payload: res,
						message: 'Task deleted Successfully..!'
					})
				})
					.catch(err => {
						return Observable.of({
							type: DELETE_TASK_FAIL,
							payload: err,
							message: 'Something went wrong, Please try again..!'
						})
					})

	static addNote = action$ =>
		action$.ofType(ADD_NOTE)
			.switchMap(({payload}) => {
				const { taskKey } = payload;
				if(payload.by === 'admin') {
					delete payload.by;
					delete payload.taskKey;
					return Observable.of(getFirebase().push(`all-tasks/${taskKey}/adminNotes`, payload))
					.switchMap((res) => {
						return Observable.of({
							type: ADD_NOTE_SUCCESS,
							payload: res,
							message: 'Note added Successfully..!'
						})
					})
					.catch(err => {
						return Observable.of({
							type: ADD_NOTE_FAIL,
							payload: err,
							message: 'Note addition fail, please try again..!'
						})
					})
				} else if(payload.by === 'worker') {
					delete payload.by;
					delete payload.taskKey;
					return Observable.of(getFirebase().push(`all-tasks/${taskKey}/workerNotes`, payload))
					.switchMap((res) => {
						return Observable.of({
							type: ADD_NOTE_SUCCESS,
							payload: res,
							message: 'Note added Successfully..!'
						})
					})
					.catch(err => {
						return Observable.of({
							type: ADD_NOTE_FAIL,
							payload: err,
							message: 'Note addition fail, please try again..!'
						})
					})
				}
			})
}