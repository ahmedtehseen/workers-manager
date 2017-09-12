import { Observable } from 'rxjs';
import { getFirebase } from 'react-redux-firebase';

import { 
	SEND_MESSAGE,
	GET_ACTIVE_CONVERSATION,
	ACTIVE_CONVERSATION_SUCCESS,
} from './Chat.actions';

export class ChatEpic {

	static sendMessage = (action$) => 
		action$.ofType(SEND_MESSAGE)
			.switchMap(({payload}) => {
				return new Observable(observer => {
					getFirebase().ref(`chats/${payload.to},${payload.from}`).once('value', snap => {
					if(snap.exists()) {
							getFirebase().push(`chats/${payload.to},${payload.from}`, payload)
						} else {
							getFirebase().push(`chats/${payload.from},${payload.to}`, payload)
						}
					})
				})
			})

	static getActiveConversation = (action$) => 
		action$.ofType(GET_ACTIVE_CONVERSATION)
			.switchMap((action) => {
				return new Observable(observer => {
					getFirebase().ref(`chats/${action.selectedUid},${action.currentUid}`).once('value', snap => {
					if(snap.exists()) {
							getFirebase().ref(`chats/${action.selectedUid},${action.currentUid}`).on('child_added', snap => {
								observer.next({ type: ACTIVE_CONVERSATION_SUCCESS, payload: snap.val() })
							})
						} else {
							getFirebase().ref(`chats/${action.currentUid},${action.selectedUid}`).on('child_added', snap => {
								observer.next({ type: ACTIVE_CONVERSATION_SUCCESS, payload: snap.val() })
							})
						}
					})
				})
			})
			
}