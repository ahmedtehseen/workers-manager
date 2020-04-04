import { Observable } from "rxjs";
import firebase from "./../../config/firebase";
// import { getFirebase } from "react-redux-firebase";
// import firebase from "firebase/app";
// import { useFirestore } from "react-redux-firebase";

import {
  SEND_MESSAGE,
  GET_ACTIVE_CONVERSATION,
  ACTIVE_CONVERSATION_SUCCESS,
} from "./Chat.actions";
import { observable } from "rxjs";

const firestore = firebase.firestore();
let messages = [];

export class ChatEpic {
  static sendMessage = (action$) =>
    action$.ofType(SEND_MESSAGE).switchMap(({ payload }) => {
      return new Observable((observer) => {
        firestore
          .collection("chat")
          .doc(`${payload.from},${payload.to}`)
          .collection(`${payload.from},${payload.to}`)
          .add({ ...payload });
      });
    });

  // selected uid: To,
  // current uid: from

  static getActiveConversation = (action$) =>
    action$.ofType(GET_ACTIVE_CONVERSATION).switchMap((action) => {
      const currentUid = firebase.auth().currentUser.uid;
      console.log(currentUid);
      console.log({ currentUid: action.currentUid });
      console.log({ selectedUid: action.selectedUid });
      return new Observable((observer) => {
        firestore
          .collection("chat")
          .doc(`${currentUid},${action.selectedUid}`)
          .collection(`${currentUid},${action.selectedUid}`)
          .where("to", "==", action.selectedUid)
          .onSnapshot(async (snap) => {
            console.log(snap);
            snap.docs.forEach((doc) => messages.push(doc.data()));
            observer.next({
              type: ACTIVE_CONVERSATION_SUCCESS,
              payload: messages,
            });
          });
      });
    });
}
