import { Observable } from "rxjs";
import firebase from "./../../config/firebase";
// import { getFirebase } from "react-redux-firebase";
// import firebase from "firebase/app";
// import { useFirestore } from "react-redux-firebase";

import {
  SEND_MESSAGE,
  GET_ACTIVE_CONVERSATION,
  ACTIVE_CONVERSATION_SUCCESS
} from "./Chat.actions";

const firestore = firebase.firestore();

export class ChatEpic {
  static sendMessage = action$ =>
    action$.ofType(SEND_MESSAGE).switchMap(({ payload }) => {
      return new Observable(observer => {
        firestore
          .collection("chat")
          .doc(`${payload.from},${payload.to}`)
          .add(payload);
      });
    });

  // selected uid: To,
  // current uid: from

  static getActiveConversation = action$ =>
    action$.ofType(GET_ACTIVE_CONVERSATION).switchMap(action => {
      return new Observable(observer => {
        firestore
          .collection("chat")
          .doc(`${action.currentUid},${action.selectedUid}`)
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              observer.next({
                type: ACTIVE_CONVERSATION_SUCCESS,
                payload: doc.data()
              });
            });
          });
      });
    });
}
