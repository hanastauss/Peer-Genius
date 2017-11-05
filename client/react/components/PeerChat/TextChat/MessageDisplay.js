import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

import Flex from '../../Flex';
import TextChatMessage from './TextChatMessage';

const styles = ({ palette: { grey }, spacing }) => ({
  window: {
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  inboundMessage: {
    alignSelf: 'flex-end'
  },
  outboundMessage: {
    borderRadius: spacing.unit / 2,
    backgroundColor: grey[500],
    alignSelf: 'flex-start'
  },
});

@withStyles(styles)
export default class MessageDisplay extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    messages: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['in', 'out']), // Inbound vs outbound messages,
      content: PropTypes.string,
      timestamp: PropTypes.instanceOf(Date)
    }))
  };

  render() {
    let { classes, loading, messages } = this.props;

    if (loading) {
      return (
        <Flex
          column
          grow={1}
          align='center'
          justify='flex-start'
        >
          <CircularProgress />
        </Flex>
      );
    }

    return (
      <Flex
        column
        grow={1}
        justify="flex-end"
      >
        {messages.map(({ type, content, timestamp }, index) => (
          <TextChatMessage
            key={timestamp.getTime()}
            type={type}
            content={content}
            timestamp={timestamp}
          />
        ))}
      </Flex>
    );
  }
}