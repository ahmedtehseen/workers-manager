import { Observable } from "rxjs";
// import * as firebase from 'firebase';
import { getFirebase } from "react-redux-firebase";
import {
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAIL,
  FILE_UPLOAD,
  FILE_UPLOAD_FAIL,
  editTask
} from "./EditTask.actions";

import firebase from "firebase/app";
const firestore = firebase.firestore();

export class EditTaskEpic {
  static uploadFile = action$ =>
    action$.ofType(FILE_UPLOAD).switchMap(({ payload }) => {
      return Observable.create(oberver => {
        const {
          completionDate,
          details,
          taskTitle,
          assignTo,
          workerId,
          file,
          adminId,
          status,
          timestamp,
          key
        } = payload;
        const fileStore = firebase
          .storage()
          .ref(`task-files/${Date.now()}/${file.name}`)
          .put(file, { contentType: file.type });
        fileStore.on(
          "state_changed",
          () => {},
          err => {
            oberver.next({
              type: FILE_UPLOAD_FAIL,
              payload: err,
              message: "Edit task fail, Please try again..!"
            });
          },
          () => {
            const fileURL = fileStore.snapshot.downloadURL;
            const obj = {
              fileURL,
              completionDate,
              details,
              taskTitle,
              assignTo,
              workerId,
              timestamp,
              adminId,
              status,
              key
            };
            oberver.next(editTask(obj));
          }
        );
      });
    });

  static editTask = action$ =>
    action$.ofType(EDIT_TASK).switchMap(({ payload }) => {
      const { key } = payload;
    //   delete payload.key;
      return Observable.concat(
        firestore
          .collection("All-tasks")
          .doc(key)
          .update({ ...payload })
      )
        .switchMap(res => {
          return Observable.of({
            type: EDIT_TASK_SUCCESS,
            payload: res,
            message: "Task edited successfully..!"
          });
        })
        .catch(err => {
          return Observable.of({
            type: EDIT_TASK_FAIL,
            payload: err,
            message: "Edit Task fail, Please try again..!"
          });
        });
    });
}
