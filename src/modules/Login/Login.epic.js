import { Observable } from "rxjs";
import firebase from "./../../config/firebase";
import { USER_LOGIN_SUCCESS } from "./Login.actions";

const firestore = firebase.firestore();

export class LoginEpic {
  static userLogin = action$ =>
    action$.ofType("@@reactReduxFirebase/LOGIN").switchMap(({ auth }) => {
      return new Observable(observer => {
        firestore
          .collection("users")
          .doc(auth.uid)
          .get()
          .then(doc => {
            observer.next({
              type: USER_LOGIN_SUCCESS,
              payload: doc.data(),
              message: "Login Successfully..!"
            });
          })
          .catch(err => console.log("error"));
      });
    });
}
