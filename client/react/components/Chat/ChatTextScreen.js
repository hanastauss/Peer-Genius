import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Flex from '../Flex';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';
import TypingHintText from './TypingHintText';
import { post } from '../../../redux/actions/network';
import { socketAttachListener, socketDetachListener, socketEmit } from '../../../redux/actions/creators/socket';

/**
 * The right side of the screen, where the actual chat is taking place.
 */
@connect(null, {
  socketEmit,
  socketAttachListener,
  socketDetachListener
})
// FixMe chat screen undergoing revamp
export default class ChatTextScreen extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      input: '',
      messages: [],
      participantTyping: false,
      participantName: ''
    };
  }

  _onChange = input => {
    this.setState({
      input
    });
  };

  _onTypeStart = () => {
    let { to, socketEmit } = this.props;
    socketEmit('type_start', {
      to
    });
  };

  _onTypeEnd = () => {
    let { to, socketEmit } = this.props;
    socketEmit('type_end', {
      to
    });
  };

  _onSubmit = () => {
    // Empty submit check
    if (!this.state.input) return;

    let { to, socketEmit } = this.props;

    // Send submission over socket
    socketEmit('sendMessage', {
      to,
      message: this.state.input
    });

    // Update own state
    this.setState(state => ({
      input: '',
      messages: state.messages.concat({
        type: 'out',
        content: state.input,
        timestamp: new Date()
      })
    }));
  };

  _onReceiveMessage = ({ from, message, createdAt }) => {
    if (from === this.props.to) { // Check if it is from the current connected user
      this.setState(state => ({
        messages: state.messages.concat({
          type: 'in',
          content: message,
          timestamp: new Date(createdAt)
        })
      }));
    }
  };

  _onIncomingTypeStart = () => {
    this.setState({
      participantTyping: true
    });
  };

  _onIncomingTypeEnd = () => {
    this.setState({
      participantTyping: false
    });
  };

  // FixMe chat screen under revamp
  _loadMessageHistory = async (params) => {
    // Get session info
    let response = await  post('/api/session/info', {
      session: params.sessionID
    });
    let { session } = await response.json();

    // Get message history
    let to = this.props.selectParticipant(session);

    let [messageResponseBody, nameResponseBody] = await Promise.all([
      post('/api/chat/getMessages', {
        participant: to,
        indexStart: 0
      }).then(response => response.json()),
      post('/api/user/getName', {
        target: to,
      }).then(response => response.json())
    ]);

    this.setState({
      participantName: nameResponseBody.name,
      messages: messageResponseBody.messages
        ? messageResponseBody.messages.map(({ createdAt, from, message }) => ({
          type: from === this.props.to ? 'in' : 'out',
          content: message,
          timestamp: new Date(createdAt)
        }))
        : [],
      loading: false
    });
  };

  componentWillMount() {
    let { match: { params } } = this.props;

    this._loadMessageHistory(params).catch(error => {
      console.error('Unexpected error when loading message history:\n', error);
    });
  }

  componentDidMount() {
    let { socketAttachListener } = this.props;
    // Register socket event listeners
    socketAttachListener('receiveMessage', this._onReceiveMessage);
    socketAttachListener('type_start', this._onIncomingTypeStart);
    socketAttachListener('type_end', this._onIncomingTypeEnd);

  }

  componentWillUnmount() {
    let { socketDetachListener } = this.props;
    // Unregister socket event listeners
    socketDetachListener('receiveMessage', this._onReceiveMessage);
    socketDetachListener('type_start', this._onIncomingTypeStart);
    socketDetachListener('type_end', this._onIncomingTypeEnd);
  }

  render() {
    let { loading, input, messages, participantName, participantTyping } = this.state;

    return (
      <Flex column grow={1}>
        <ChatDisplay
          loading={loading}
          messages={messages}
        />
        <ChatInput
          value={input}
          onChange={this._onChange}
          onTypeStart={this._onTypeStart}
          onTypeEnd={this._onTypeEnd}
          onSubmit={this._onSubmit}
        />
        {participantTyping && <TypingHintText participantName={participantName} />}
      </Flex>
    );
  }
}