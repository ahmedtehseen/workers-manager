import { Observable } from "rxjs";
import firebase from "./../../config/firebase";
import { getFirebase } from "react-redux-firebase";
import {
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  CREATE_TASK,
  FILE_UPLOAD_FAIL,
  createTask
} from "./AddTask.actions";

const firestore = firebase.firestore();

export class TaskEpic {
  static uploadFile = action$ =>
    action$.ofType(ADD_TASK).switchMap(({ payload }) => {
      return Observable.create(oberver => {
        const {
          completionDate,
          details,
          taskTitle,
          assignTo,
          workerId,
          file,
          adminId,
          status
        } = payload;
        const fileStore = firebase
          .storage()
          .ref(`task-files/${Date.now()}/${file.name}`)
          .put(file, { contentType: file.type });
        fileStore.on(
          "state_changed",
          () => {},
          err => {
            console.log(err);
            oberver.next({
              type: FILE_UPLOAD_FAIL,
              payload: err,
              message: "Task addition fail, Please try again..!"
            });
          },
          () => {
            const fileURL = fileStore.snapshot.downloadURL;
            const timestamp = firebase.database.ServerValue.TIMESTAMP;
            const obj = {
              fileURL,
              completionDate,
              details,
              taskTitle,
              assignTo,
              workerId,
              timestamp,
              adminId,
              status
            };
            oberver.next(createTask(obj));
          }
        );
      });
    });

  static addTask = action$ =>
    action$.ofType(CREATE_TASK).switchMap(({ payload }) => {
      console.log(payload, "all-tasks");
      return new Observable.concat(
        firestore
          .collection("All-tasks")
          .doc()
          .add({ ...payload })
      )
        .switchMap(res => {
          return Observable.of({
            type: ADD_TASK_SUCCESS,
            payload: res,
            message: "Task added successfully..!"
          });
        })
        .catch(err => {
          return Observable.of({
            type: ADD_TASK_FAIL,
            payload: err,
            message: "Task addition fail, Please try again..!"
          });
        });
    });
}
