import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import VideoIcon from 'material-ui-icons/VideoCall';

import { connect } from 'react-redux';

import Button from '../../Button';
import Flex from '../../Flex';
import MessageDisplay from './MessageDisplay';
import ChatInput from './ChatInput';

import { socketEmit, socketAttachListener, socketDetachListener } from '../../../../redux/actions/creators/socket';
import { post } from '../../../../redux/actions/network';

const styles = {
  root: {
    position: 'relative'
  },
  callButton: {
    position: 'absolute',
    top: '1em',
    right: '1em'
  },
  videoButton: {
    position: 'absolute',
    top: '1em',
    right: '1em'
  }
};

@connect(null, {
  socketEmit,
  socketAttachListener,
  socketDetachListener
})
@withStyles(styles)
export default class TextChat extends Component {
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

    let { toId, socketEmit, match: { params } } = this.props;

    // Send submission over socket
    socketEmit('sendMessage', {
      receiverId: toId,
      message: this.state.input,
      sessionId: params.sessionId
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

  _onReceiveMessage = ({ senderId, message, timestamp }) => {
    if (senderId === this.props.toId) { // Check if it is from the current connected user
      this.setState(state => ({
        messages: state.messages.concat({
          type: 'in',
          content: message,
          timestamp: new Date(timestamp)
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

  _loadMessageHistory = async (params) => {
    let { toId } = this.props;

    // Get name and message history
    let [messageData, nameData] = await Promise.all([
      post('/api/chat/getMessages', {
        sessionId: params.sessionId
      }).then(response => response.json()),
      post('/api/user/getName', {
        target: toId,
      }).then(response => response.json())
    ]);

    this.setState({
      participantName: nameData.name,
      messages: messageData.messages
        ? messageData.messages.map(({ createdAt, senderId, message }) => ({
          type: senderId === this.props.toId ? 'in' : 'out',
          content: message,
          timestamp: new Date(createdAt)
        })).reverse()
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
    let { classes, active, setVideo } = this.props;
    let { loading, input, messages, participantName, participantTyping } = this.state;

    if (!active) {
      return null;
    }

    return (
      <Flex
        className={classes.root}
        column
        grow={1}
      >
        <MessageDisplay
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
        <IconButton
          className={classes.videoButton}
          onClick={() => setVideo(true)}
        >
          <VideoIcon />
        </IconButton>
      </Flex>
    );
  }
}