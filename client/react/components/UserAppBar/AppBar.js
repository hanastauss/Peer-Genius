import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Button from '../Button';
import Flex from '../Flex';
import Text from '../Text';
import AccountMenu from './AccountMenu';
import AboutUs from './AboutUs';
import PeerGeniusLogo from '../Logo';
import GuruMenu from './GuruMenu';

const styles = ({ palette: { primary, getContrastText }, spacing }) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    backgroundColor: '#50969F'
  },
  logo: {
    width: 40,
    height: '100%',
    cursor: 'pointer',
    marginLeft: 90
  },
  appBarText: {
    color: getContrastText(primary[700]),
    padding: spacing.unit
  },
  appBarButton: {
    width: '5em'
  }
});

const UserAppBar =
  connect(null, { push })(
    withStyles(styles)(
      props => {
        let { className, classes, push } = props;

        return (
          <AppBar position="static" className={classNames(classes.appBar, className)}>
            <Flex align="center">
              <Button style={{height: '100%'}} onClick={() => push('/newbie')}>
                <PeerGeniusLogo
                  imageOnly
                  className={classes.logo}
                />
                <Text type="title" className={classes.appBarText}>Peer Genius</Text>
              </Button>
            </Flex>
            <Flex align="center">
              <GuruMenu />
              <AboutUs />
              <AccountMenu />
            </Flex>
          </AppBar>
        );
      }
    )
  );

UserAppBar.displayName = 'UserAppBar';

export default UserAppBar;
