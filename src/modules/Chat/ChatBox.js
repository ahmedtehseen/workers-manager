import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Subheader, TextField, Divider, RaisedButton } from 'material-ui';
import ChatBubble from 'react-chat-bubble';
// actions
import { sendMessage, getActiveConversion, resetConversation } from './Chat.actions';
// styles 
import './Chat.css';

const themeColor = '#7AB15A';

class ChatComponent extends Component {
	constructor(props) {
		super(props)
		this.state ={
			message: ''
		}
	}

	scrollToBottom() {
  const node = ReactDOM.findDOMNode(this.messagesEnd);
	  node.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
	  this.props.getActiveConversion(this.props.params.key, this.props.user ? this.props.user.uid : '');
	}

	componentDidUpdate() {
	  this.scrollToBottom();
	}

	componentWillUnmount() {
		this.props.resetConversation();
	}

	renderChat() {
		const messages = this.props.activeConversation.length !== 0 ? this.props.activeConversation.map((chat,i) => {
			if(chat.from === this.props.user.uid) {
				const chatObj =[{
					'type': 0,
					'image': `${process.env.PUBLIC_URL + "/avatar.png"}`,
					'text': chat.message
				}]
				return <ChatBubble key={i} messages={chatObj}/>
			} else {
				const chatObj =[{
					'type': 1,
					'image': `${process.env.PUBLIC_URL + "/avatar.png"}`,
					'text': chat.message
				}]
				return <ChatBubble key={i} messages={chatObj} />
			}
		}) : ''
		return messages
	}

	handleSubmit(e){
		e.preventDefault()
		if(this.state.message.length !== 0) {
			const obj = {
				'from': this.props.user.uid,
				'message': this.state.message,
				'to': this.props.params.key
			}
			this.props.sendMessage(obj)
		}
		this.setState({
			message: ''
		})

	}

	render() {
		const { key } = this.props.params
		return (
			<div className='chatbox-container'>
				<div>
					<Subheader>
						{this.props.users ? this.props.users[key].name : 'Chat'}
					</Subheader>
					<Divider/>
				</div>
				<div className='chat-area'>
					{this.renderChat()}
					<div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
				</div>
				<div>
					<Divider/>
					<form onSubmit={(e) => this.handleSubmit(e)} className='chat-form'>
						<TextField
				      hintText="Start your chat here..."
				      fullWidth={true}
				      value={this.state.message}
				      underlineFocusStyle={{ borderColor: themeColor }}
				      onChange={(e) => this.setState({ message: e.target.value })}
				      className='message-input'
				    />
				    <RaisedButton
				    	label='Send'
				    	type='submit'
				    	style={{boxShadow:'none', marginTop:'5px'}}
				    	labelColor='#fff'
				    	backgroundColor={themeColor}
				    />
			    </form>
		    </div>
			</div>
		)
	}
}

const wrappedChatComponent = firebaseConnect()(ChatComponent);

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		activeConversation: state.chat.activeConversation,
		users: state.dashboard.workers
	}
}

export let ChatBox = connect(
mapStateToProps,
{sendMessage, getActiveConversion, resetConversation}
)(wrappedChatComponent)