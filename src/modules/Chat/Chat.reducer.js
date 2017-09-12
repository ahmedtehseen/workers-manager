import { ACTIVE_CONVERSATION_SUCCESS, RESET_CONVERSATION } from './Chat.actions';

const initialState = {
	activeConversation: []
}

export const ChatReducer = (state = initialState, action) => {
	switch(action.type){
		case ACTIVE_CONVERSATION_SUCCESS:
			return Object.assign({}, state, {
				activeConversation: [...state.activeConversation, action.payload]
			});
		case RESET_CONVERSATION:
			return initialState;
		default:
			return state;
	}

}