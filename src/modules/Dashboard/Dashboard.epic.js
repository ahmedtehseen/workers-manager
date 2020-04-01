import { Observable } from "rxjs";
import firebase from "./../../config/firebase";
// import { useFirestore } from "react-redux-firebase";

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
  // DELETE_NOTE_FAIL,
  DELIVER_TASK,
  // DELIVER_TASK_SUCCESS,
  DELIVER_TASK_FAIL,
  REASSIGN_TASK,
  REASSIGN_TASK_SUCCESS,
  REASSIGN_TASK_FAIL
  // GET_MANAGERS,
  // GET_MANAGERS_SUCCESS,
  // GET_MANAGERS_FAIL,
} from "./Dashboard.actions";
import { App } from "../App";
import { observable } from "rxjs";
const firestore = firebase.firestore();

const deleteCollection = firebase.functions().httpsCallable("deleteNote");

export class DashboardEpic {
  static getAllWorkers = action$ =>
    action$.ofType(GET_WORKERS).switchMap(() => {
      return new Observable(observer => {
        firestore
          .collection("users")
          .get()
          .then(snapshot => {
            return snapshot.docs.forEach(doc =>
              observer.next({ type: GET_WORKERS_SUCCESS, payload: doc.data() })
            );
          });
      }).catch(err => {
        return Observable.of({
          type: GET_WORKERS_FAIL,
          payload: err
        });
      });
    });

  static deleteTask = action$ =>
    action$
      .ofType(DELETE_TASK)
      .switchMap(({ payload }) => {
        return Observable.of(
          firestore
            .collection("All-tasks")
            .doc(payload)
            .delete()
        );
      })
      .switchMap(res => {
        return Observable.of({
          type: DELETE_TASK_SUCCESS,
          payload: res,
          message: "Task deleted Successfully..!"
        });
      })
      .catch(err => {
        return Observable.of({
          type: DELETE_TASK_FAIL,
          payload: err,
          message: "Something went wrong, Please try again..!"
        });
      });

  static addNote = action$ =>
    action$.ofType(ADD_NOTE).switchMap(({ payload }) => {
      const { taskKey } = payload;
      if (payload.by === "admin") {
        delete payload.by;
        delete payload.taskKey;
        return Observable.of(
          // getFirebase().push(`all-tasks/${taskKey}/adminNotes`, payload)
          firestore
            .collection("All-tasks")
            .doc(taskKey)
            .collection("adminNotes")
            .doc()
            .add(payload)
        )
          .switchMap(res => {
            return Observable.of({
              type: ADD_NOTE_SUCCESS,
              payload: res,
              message: "Note added Successfully..!"
            });
          })
          .catch(err => {
            return Observable.of({
              type: ADD_NOTE_FAIL,
              payload: err,
              message: "Note addition fail, please try again..!"
            });
          });
      } else if (payload.by === "worker") {
        delete payload.by;
        delete payload.taskKey;
        return Observable.of(
          // getFirebase().push(`all-tasks/${taskKey}/workerNotes`, payload)
          firestore
            .collection("All-tasks")
            .doc(taskKey)
            .collection("workerNotes")
            .doc()
            .add(payload)
        )
          .switchMap(res => {
            return Observable.of({
              type: ADD_NOTE_SUCCESS,
              payload: res,
              message: "Note added Successfully..!"
            });
          })
          .catch(err => {
            return Observable.of({
              type: ADD_NOTE_FAIL,
              payload: err,
              message: "Note addition fail, please try again..!"
            });
          });
      }
    });

  static deleteNote = action$ =>
    action$.ofType(DELETE_NOTE).switchMap(({ payload }) => {
      const { taskKey } = payload;
      if (payload.adminNote) {
        return Observable.of(
          deleteCollection({
            path: firestore
              .collection("All-tasks")
              .doc(taskKey)
              .collection("adminNotes")
          })
        )
          .switchMap(res => {
            return Observable.of({
              type: DELETE_NOTE_SUCCESS,
              payload: res,
              message: "Note deleted..!"
            });
          })
          .catch(err => {
            return Observable.of({
              type: ADD_NOTE_FAIL,
              payload: err,
              message: "Note deletion fail, Please try again..!"
            });
          });
      } else {
        return Observable.of(
          deleteCollection({
            path: firestore
              .collection("All-tasks")
              .doc(taskKey)
              .collection("workerNotes")
          })
        )
          .switchMap(res => {
            return Observable.of({
              type: DELETE_NOTE_SUCCESS,
              payload: res,
              message: "Note deleted..!"
            });
          })
          .catch(err => {
            return Observable.of({
              type: ADD_NOTE_FAIL,
              payload: err,
              message: "Note deletion fail, Please try again..!"
            });
          });
      }
    });

  static deliverTask = action$ =>
    action$.ofType(DELIVER_TASK).switchMap(({ payload }) => {
      return Observable.of(
        firestore
          .collection("All-tasks")
          .doc(payload)
          .update({
            status: "completed"
          })
      )
        .switchMap(res => {
          return Observable.of({
            type: DELETE_TASK_SUCCESS,
            payload: res,
            message: "Task delivered Successfully..!"
          });
        })
        .catch(err => {
          return Observable.of({
            type: DELIVER_TASK_FAIL,
            payload: err,
            message: "Something went wrong, Please deliver again..!"
          });
        });
    });

  static reAssignTask = action$ =>
    action$.ofType(REASSIGN_TASK).switchMap(({ payload }) => {
      return Observable.of(
        firestore
          .collection("All-tasks")
          .doc(payload)
          .update({ status: "pending" })
      )
        .switchMap(res => {
          return Observable.of({
            type: REASSIGN_TASK_SUCCESS,
            payload: res,
            message: "Task Re-Assigned Successfully..!"
          });
        })
        .catch(err => {
          return Observable.of({
            type: REASSIGN_TASK_FAIL,
            payload: err,
            message: "Something went wrong, Please Assign again..!"
          });
        });
    });
}
