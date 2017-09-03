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
	DELETE_NOTE,
	DELETE_NOTE_SUCCESS,
	DELETE_NOTE_FAIL,
	DELIVER_TASK,
	DELIVER_TASK_SUCCESS,
	DELIVER_TASK_FAIL,
	REASSIGN_TASK,
	REASSIGN_TASK_SUCCESS,
	REASSIGN_TASK_FAIL,
	GET_MANAGERS,
	GET_MANAGERS_SUCCESS,
	GET_MANAGERS_FAIL,
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

	// static getAllManagers = action$ =>
	// 	action$.ofType(GET_MANAGERS)
	// 		.switchMap(() => {
	// 			return new Observable(observer => {
	// 				getFirebase().ref('users').on('value', snap => {
	// 					const snapObj = snap.val();
	// 					const managerKeysArr = Object.keys(snapObj).filter(key => {
	// 						return snapObj[key].role === 'admin'
	// 					})
	// 					const managersArr = managerKeysArr.map(key => (snapObj[key]))
	// 					observer.next({ type: GET_MANAGERS_SUCCESS, payload: managersArr })
	// 				})
	// 			}).catch((err) => {
	// 				return Observable.of({
	// 					type: GET_MANAGERS_FAIL,
	// 					payload: err,
	// 				})
	// 			})
	// 		})

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

	static deleteNote = action$ =>
		action$.ofType(DELETE_NOTE)
			.switchMap(({payload}) => {
				if(payload.adminNote) {
					return Observable.of(getFirebase().remove(`all-tasks/${payload.taskKey}/adminNotes/${payload.noteKey}`))
					.switchMap(res => {
						return Observable.of({
							type: DELETE_NOTE_SUCCESS,
							payload: res,
							message: 'Note deleted..!'
						})
					})
					.catch(err => {
						return Observable.of({
							type: ADD_NOTE_FAIL,
							payload: err,
							message: 'Note deletion fail, Please try again..!'
						})
					})
				} else {
					return Observable.of(getFirebase().remove(`all-tasks/${payload.taskKey}/workerNotes/${payload.noteKey}`))
					.switchMap(res => {
						return Observable.of({
							type: DELETE_NOTE_SUCCESS,
							payload: res,
							message: 'Note deleted..!'
						})
					})
					.catch(err => {
						return Observable.of({
							type: ADD_NOTE_FAIL,
							payload: err,
							message: 'Note deletion fail, Please try again..!'
						})
					})
				}
			})

		static deliverTask = action$ =>
			action$.ofType(DELIVER_TASK)
				.switchMap(({payload}) => {
					return Observable.of(getFirebase().update(`all-tasks/${payload}`, {status: 'completed'}))
						.switchMap(res => {
							return Observable.of({
								type: DELETE_TASK_SUCCESS,
								payload: res,
								message: 'Task delivered Successfully..!'
							})
						})
						.catch(err => {
							return Observable.of({
								type: DELIVER_TASK_FAIL,
								payload: err,
								message: 'Something went wrong, Please deliver again..!'
							})
						})
				})

		static reAssignTask = action$ =>
			action$.ofType(REASSIGN_TASK)
				.switchMap(({payload}) => {
					return Observable.of(getFirebase().update(`all-tasks/${payload}`, {status: 'pending'}))
						.switchMap(res => {
							return Observable.of({
								type: REASSIGN_TASK_SUCCESS,
								payload: res,
								message: 'Task Re-Assigned Successfully..!'
							})
						})
						.catch(err => {
							return Observable.of({
								type: REASSIGN_TASK_FAIL,
								payload: err,
								message: 'Something went wrong, Please Assign again..!'
							})
						})
				})
}