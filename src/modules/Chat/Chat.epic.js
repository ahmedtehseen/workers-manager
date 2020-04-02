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
import { observable } from "rxjs";

const firestore = firebase.firestore();
let messages = [];

export class ChatEpic {
  static sendMessage = action$ =>
    action$.ofType(SEND_MESSAGE).switchMap(({ payload }) => {
      return new Observable(observer => {
        firestore
          .collection("chat")
          .doc(`${payload.from},${payload.to}`)
          .collection(`${payload.from},${payload.to}`)
          .add({ ...payload });
      });
    });

  // selected uid: To,
  // current uid: from

  static getActiveConversation = action$ =>
    action$.ofType(GET_ACTIVE_CONVERSATION).switchMap(action => {
      console.log(action.currentUid);
      console.log(action.selectedUid);
      return new Observable(observer => {
        firestore
          .collection("chat")
          .doc(`${action.currentUid},${action.selectedUid}`)
          .collection(`${action.currentUid},${action.selectedUid}`)
          .where("to", "==", action.selectedUid)
          .onSnapshot(async snap => {
            console.log("first");
            snap.docs.forEach(doc => messages.push(doc.data()));
          });
      
      });
    });
}
