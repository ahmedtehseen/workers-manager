export const SEND_MESSAGE = 'SEND_MESSAGE';

export const GET_ACTIVE_CONVERSATION = 'GET_ACTIVE_CONVERSATION';
export const ACTIVE_CONVERSATION_SUCCESS = 'ACTIVE_CONVERSATION_SUCCESS';

export const RESET_CONVERSATION = 'RESET_CONVERSATION';

export const sendMessage = (props) => {
	return {
		type: SEND_MESSAGE,
		payload: props,
	}
}

export const getActiveConversion = (selectedUid, currentUid) => {
	return {
		type: GET_ACTIVE_CONVERSATION,
		selectedUid,
		currentUid
	}
}

export const resetConversation = () => {
	return {
		type: RESET_CONVERSATION
	}
}